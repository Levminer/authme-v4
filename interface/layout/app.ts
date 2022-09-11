import App from "./app.svelte"
import "../styles/index.css"
import { os, event, window, invoke } from "@tauri-apps/api"
import { getSettings } from "../stores/settings"
import { navigate } from "../libraries/navigate"
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater"
import { relaunch } from "@tauri-apps/api/process"
import { getState } from "interface/stores/state"

const settings = getSettings()
const state = getState()

// Create the svelte app
const app = new App({
	target: document.body,
})

export default app

// Set background color if vibrancy not supported
const setBackground = async () => {
	const system = await os.type()
	const build = await os.version()

	if (system === "Windows_NT" && build < "10.0.22000") {
		document.querySelector("body").style.background = "black"
	}

	if (system === "Linux") {
		document.querySelector("body").style.background = "black"
	}
}

setBackground()

// Tray settings open handler
event.listen("openSettings", () => {
	navigate("settings")
})

// Listen for focus changes
window.appWindow.onFocusChanged((focused) => {
	const path = location.pathname

	if (focused.payload === true) {
		if (path === "/codes") {
			document.querySelector<HTMLInputElement>(".search").focus()
		}
	}
})

// Listen for close request
window.appWindow.onCloseRequested((event) => {
	if (settings.settings.minimizeToTray === true) {
		event.preventDefault()
		window.appWindow.hide()

		navigate("idle")
	}
})

// Disable right click
document.addEventListener("contextmenu", (event) => {
	event.preventDefault()
})


export default app
