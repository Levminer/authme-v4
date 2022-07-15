import { writable, get } from "svelte/store"

export const settings = writable(
	localStorage.settings
		? JSON.parse(localStorage.settings)
		: {
				security: {
					requireAuthentication: null,
					password: null,
					key: null,
				},
		  }
)

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
