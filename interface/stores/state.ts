import { writable, get } from "svelte/store"

export const state = writable(
	sessionStorage.state
		? JSON.parse(sessionStorage.state)
		: {
				authenticated: false,
				importData: null,
		  }
)

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
