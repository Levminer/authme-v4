import { textConverter } from "../../../libraries/convert"
import { TOTP } from "otpauth"

let codesRefresher: NodeJS.Timer
const searchQuery: string[] = []

export const test = () => {
	const text = `
Name:   Google:leventelorik92@gmail.com 
Secret: BVPK3JHAZO5AF6XUYS6AYMB3Y5KDR6R2 
Issuer: Google 
Type:   OTP_TOTP 
	
Name:   Levminer@leventelorik92@gmail.com 
Secret: HVV3CUZC6RRGFK5L 
Issuer: GitHub 
Type:   OTP_TOTP `

	let arr = textConverter(text, 0)

	console.log(arr)

	generateCodeElements(arr)
}

export const generateCodeElements = (data: LibImportFile) => {
	const names = data.names
	const secrets = data.secrets
	const issuers = data.issuers

	document.querySelector(".importCodes").style.display = "none"
	document.querySelector(".importingCodes").style.display = "none"
	document.querySelector(".gettingStarted").style.display = "none"
	document.querySelector(".searchContainer").style.display = "flex"

	const generate = () => {
		for (let i = 0; i < names.length; i++) {
			// create div
			const element = document.createElement("div")

			// set div content
			element.innerHTML = `
			<div class="mt-5 flex flex-row px-5">
				<div class="flex flex-1 justify-start">
					<h3 id="name${i}" tabindex="0" class="mt-3 text-3xl font-normal">-</h3>
				</div>
				<div class="flex flex-1 justify-center">
					<p id="code${i}" tabindex="0" class="transparent-900 relative mt-1.5 w-[140px] select-all rounded-2xl py-3 px-5 text-2xl">-</p>
				</div>
				<div class="flex flex-1 justify-end">
					<h3 id="time${i}" tabindex="0" class="mt-3 text-3xl font-normal">-</h3>
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

			// add to query
			searchQuery.push(`${issuers[i].toLowerCase().trim()}`)

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

	codesRefresher = setInterval(() => {
		try {
			refreshCodes(secrets)
		} catch (error) {
			console.error("Error refreshing codes")
		}
	}, 500)
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
		if (!searchQuery[i].startsWith(input)) {
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
	}
}