import { writable, get } from "svelte/store"

const defaultState: LibState = {
	authenticated: false,
	importData: null,
	updateAvailable: false,
}

export const state = writable<LibState>(sessionStorage.state ? JSON.parse(sessionStorage.state) : defaultState)

state.subscribe((data) => {
	console.log("State changed: ", data)

	sessionStorage.setItem("state", JSON.stringify(data))
})

export const getState = (): LibState => {
	return get(state)
}

export const setState = (newState: LibState) => {
	state.set(newState)
}

export const resetState = () => {
	state.set(defaultState)
}
