import { writable, get } from "svelte/store"

const defaultSettings: LibSettings = {
	security: {
		requireAuthentication: null,
		password: null,
		key: null,
	},
}

export const settings = writable(localStorage.settings ? JSON.parse(localStorage.settings) : defaultSettings)

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
