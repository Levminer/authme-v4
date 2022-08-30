import { invoke } from "@tauri-apps/api"
import { writable, get } from "svelte/store"
import build from "../../build.json"

const defaultSettings: LibSettings = {
	info: {
		version: build.version,
		build: build.number,
		date: build.date,
	},

	security: {
		requireAuthentication: null,
		password: null,
	},

	settings: {
		launchOnStartup: true,
		minimizeToTray: true,
		optionalAnalytics: true,
		codesDescription: false,
		blurCodes: false,
		searchHistory: true,
		sortCodes: 0,
	},

	searchHistory: {
		latest: null,
	},

	searchFilter: {
		name: true,
		description: false,
	},

	vault: {
		codes: null,
	},
}

const dev = build.dev === "true"

if (dev === false && localStorage.settings === undefined) {
	invoke("auto_launch")
}

export const settings = writable<LibSettings>(localStorage.settings ? JSON.parse(localStorage.settings) : defaultSettings)

settings.subscribe((data) => {
	console.log("Settings changed: ", data)

	localStorage.setItem("settings", JSON.stringify(data))
})

export const getSettings = (): LibSettings => {
	return get(settings)
}

export const setSettings = (newSettings: LibSettings) => {
	settings.set(newSettings)
}

export const resetSettings = () => {
	settings.set(defaultSettings)
}
