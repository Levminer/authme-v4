import { textConverter } from "../../utils/convert"
import { TOTP } from "otpauth"
import { dialog, fs } from "@tauri-apps/api"
import { getSettings, setSettings } from "../../stores/settings"
import { getState, setState } from "../../stores/state"
import { decryptData, encryptData } from "interface/utils/encryption"
import logger from "interface/utils/logger"

const settings = getSettings()
const state = getState()
let codesRefresher: NodeJS.Timer
let searchQuery: LibSearchQuery[] = []
let saveText: string = ""

export const generateCodeElements = (data: LibImportFile) => {
	const names = data.names
	const secrets = data.secrets
	const issuers = data.issuers

	document.querySelector(".importCodes").style.display = "none"
	document.querySelector(".gettingStarted").style.display = "none"
	document.querySelector(".searchContainer").style.display = "flex"

	const generate = () => {
		for (let i = 0; i < names.length; i++) {
			// create div
			const element = document.createElement("div")

			// set div content
			if (settings.settings.codesDescription === false) {
				element.innerHTML = `
				<div class="mt-5 flex flex-row px-5">
					<div class="flex flex-1 justify-start">
						<h3 id="name${i}" tabindex="0" class="whitespace-nowrap mt-3 text-3xl font-normal focusRing rounded-2xl">-</h3>
					</div>
					<div class="flex flex-1 justify-center px-3">
						<p id="code${i}" tabindex="0" class="transparent-900 relative mt-1.5 w-[140px] select-all rounded-2xl py-3 px-5 text-2xl focusRing">-</p>
					</div>
					<div class="flex flex-1 justify-end">
						<h3 id="time${i}" tabindex="0" class="mt-3 text-3xl font-normal focusRing rounded-2xl">-</h3>
					</div>
				</div>
				<div class="mt-5 flex flex-col items-center justify-center">
					<div class="progress">
						<div id="progress${i}" class="progressFill" />
					</div>
				</div>
				<div class="mb-5 mt-5 flex items-center justify-center">
					<button id="button${i}" class="button w-[140px] py-3 px-5">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
						Copy
					</button>
				</div>`
			} else {
				element.innerHTML = `
				<div class="mt-5 flex flex-row px-5">
					<div class="flex flex-1 justify-start">
						<h3 id="name${i}" tabindex="0" class="whitespace-nowrap mt-3 text-3xl font-normal focusRing rounded-2xl">-</h3>
					</div>
					<div class="flex flex-1 justify-center px-3">
						<p id="code${i}" tabindex="0" class="transparent-900 relative mt-1.5 w-[140px] select-all rounded-2xl py-3 px-5 text-2xl focusRing">-</p>
					</div>
					<div class="flex flex-1 justify-end">
						<h3 id="time${i}" tabindex="0" class="mt-3 text-3xl font-normal focusRing rounded-2xl">-</h3>
					</div>
				</div>
				<div class="mt-5 flex flex-col items-center justify-center">
					<div class="progress">
						<div id="progress${i}" class="progressFill" />
					</div>
				</div>
				<p tabindex="0" class="text-2xl transparent-900 py-3 px-5 rounded-2xl select-all mt-5" id="description${i}">Description</p>
				<div class="mb-5 mt-5 flex items-center justify-center">
					<button id="button${i}" class="button w-[140px] py-3 px-5">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
						Copy
					</button>
				</div>`
			}

			// add div
			element.classList.add("code")
			element.setAttribute("id", `codes${i}`)

			document.querySelector(".content").appendChild(element)

			// get elements
			const name = document.querySelector(`#name${i}`)
			const code = document.querySelector(`#code${i}`)
			const time = document.querySelector(`#time${i}`)
			const description = document.querySelector(`#description${i}`)
			const progress = document.querySelector(`#progress${i}`)
			const button = document.querySelector(`#button${i}`)

			// blur codes
			if (settings.settings.blurCodes === true) {
				code.classList.add("blurCodes")
			}

			// description
			if (settings.settings.codesDescription === true) {
				description.textContent = names[i]
			}

			// add to query
			searchQuery.push({
				name: `${issuers[i].toLowerCase().trim()}`,
				description: `${names[i].toLowerCase().trim()}`,
			})

			// generate token
			const token = new TOTP({
				secret: secrets[i],
			}).generate()

			// get remaining time
			const remainingTime = 30 - Math.floor((new Date(Date.now()).getTime() / 1000.0) % 30)

			// progress bar value
			const value = remainingTime * (100 / 30)
			progress.style.width = `${value}%`

			name.textContent = issuers[i]
			code.textContent = token
			time.textContent = remainingTime.toString()

			button.addEventListener("click", () => {
				navigator.clipboard.writeText(code.textContent)

				button.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
				</svg>
				Copied
				`

				setTimeout(() => {
					button.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
					</svg>
					Copy
					`
				}, 800)
			})
		}
	}

	generate()

	if (state.importData !== null) {
		saveCodes()
	}

	codesRefresher = setInterval(() => {
		try {
			refreshCodes(secrets)
		} catch (error) {
			logger.error("Error refreshing codes")
		}
	}, 500)

	// latest search from history
	const latestSearch = state.searchHistory

	if (latestSearch !== null && latestSearch.trim() !== "") {
		const searchBar: HTMLInputElement = document.querySelector(".search")
		searchBar.value = state.searchHistory

		search()
	}

	if (settings.settings.codesLayout === 0) {
		const main = document.querySelector(".main")
		const content = document.querySelector(".content")

		main.classList.remove("w-3/5")
		main.classList.add("w-4/5")

		content.classList.remove("flex-col")
		content.classList.add("flex-row")
	}
}

const refreshCodes = (secrets: string[]) => {
	for (let i = 0; i < secrets.length; i++) {
		const code = document.querySelector(`#code${i}`)
		const time = document.querySelector(`#time${i}`)
		const progress = document.querySelector(`#progress${i}`)

		// generate token
		const token = new TOTP({
			secret: secrets[i],
		}).generate()

		// generate time
		const remainingTime = 30 - Math.floor((new Date(Date.now()).getTime() / 1000.0) % 30)

		// progress bar
		const value = remainingTime * (100 / 30)
		progress.style.width = `${value}%`

		// set content
		code.textContent = token
		time.textContent = remainingTime.toString()
	}
}

export const stopCodesRefresher = () => {
	clearInterval(codesRefresher)
}

export const search = () => {
	const searchBar: HTMLInputElement = document.querySelector(".search")
	const input = searchBar.value.toLowerCase()
	let noResults = 0

	// restart
	for (let i = 0; i < searchQuery.length; i++) {
		const div = document.querySelector(`#codes${[i]}`)
		div.style.display = "flex"
	}

	document.querySelector(".noSearchResults").style.display = "none"

	// search algorithm
	for (let i = 0; i < searchQuery.length; i++) {
		let searchParameter: boolean

		if (settings.searchFilter.name === true && settings.searchFilter.description === false) {
			searchParameter = searchQuery[i].name.startsWith(input)
		} else if (settings.searchFilter.description === true && settings.searchFilter.name === false) {
			searchParameter = searchQuery[i].description.startsWith(input)
		} else {
			searchParameter = `${searchQuery[i].name} ${searchQuery[i].description}`.includes(input)
		}

		if (!searchParameter) {
			const div = document.querySelector(`#codes${[i]}`)
			div.style.display = "none"

			if (div.style.display === "none") {
				noResults++
			}
		}
	}

	// no search results
	if (searchQuery.length === noResults) {
		document.querySelector(".noSearchResults").style.display = "block"
		document.querySelector(".searchResult").textContent = input
	} else {
		// save results
		state.searchHistory = input
		setSettings(settings)
	}
}

export const chooseImportFile = async () => {
	const filePath = await dialog.open({ filters: [{ name: "Authme file", extensions: ["authme"] }] })

	if (filePath !== null) {
		const loadedFile = await fs.readTextFile(filePath.toString())
		const file: LibAuthmeFile = JSON.parse(loadedFile)
		const importString = Buffer.from(file.codes, "base64").toString()

		saveText = importString

		dialog.message("Codes imported. \n\nYou can edit your codes on the edit page.")

		state.importData = importString
		setState(state)

		generateCodeElements(textConverter(importString, 0))
	}
}

const saveCodes = async () => {
	const encryptedText = await encryptData(saveText)

	state.importData = null
	settings.vault.codes = encryptedText

	setState(state)
	setSettings(settings)
}

export const loadCodes = async () => {
	searchQuery = []
	let savedCodes = false

	if (settings.vault.codes !== null) {
		// There are saved codes
		savedCodes = true
	} else {
		// No saved and no imported codes
		document.querySelector(".importCodes").style.display = "block"
		document.querySelector(".gettingStarted").style.display = "block"
	}

	if (savedCodes === true) {
		const decryptedText = await decryptData(settings.vault.codes)

		if (state.importData !== null) {
			// There are saved and new codes
			savedCodes = false
			saveText = state.importData + decryptedText

			generateCodeElements(textConverter(state.importData + decryptedText, settings.settings.sortCodes))
		} else {
			// There are saved but not new ones
			generateCodeElements(textConverter(decryptedText, settings.settings.sortCodes))
		}

		document.querySelector<HTMLInputElement>(".search").focus()
	} else {
		if (state.importData !== null) {
			// There are no saved codes, but new codes imported
			saveText = state.importData

			generateCodeElements(textConverter(state.importData, settings.settings.sortCodes))
		}
	}
}
