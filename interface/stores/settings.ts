import { invoke } from "@tauri-apps/api"
import { writable, get, Writable } from "svelte/store"
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
		key: null,
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
}

const dev = build.dev === "true"

if (dev === false && localStorage.settings === undefined) {
	invoke("auto_launch")
}

export const settings: Writable<LibSettings> = writable(localStorage.settings ? JSON.parse(localStorage.settings) : defaultSettings)

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
