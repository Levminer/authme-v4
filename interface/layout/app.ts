import App from "./app.svelte"
import "../styles/index.css"
import { os, event, window, invoke } from "@tauri-apps/api"
import { getSettings } from "../stores/settings"
import { navigate } from "../utils/navigate"
import { getState } from "interface/stores/state"
import { dev } from "../../build.json"
import { optionalAnalyticsPayload } from "interface/utils/analytics"
import { checkForUpdate } from "interface/utils/update"

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
	if (state.authenticated === true) {
		navigate("settings")
	}
})

// Tray navigate to codes handler
event.listen("openCodes", () => {
	if (state.authenticated === true) {
		navigate("codes")
	}
})

// Listen for focus changes
window.appWindow.onFocusChanged((focused) => {
	const path = location.pathname

	if (focused.payload === true && state.authenticated === true) {
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

		if (state.authenticated === true) {
			navigate("idle")
		}
	}
})

// Disable right click
document.addEventListener("contextmenu", (event) => {
	event.preventDefault()
})

// Handle launch options
const launchOptions = async () => {
	const args: string[] = await invoke("get_args")

	if (args[1] === "--minimized" && state.authenticated === true) {
		navigate("idle")
	}
}

launchOptions()

// Optional analytics
const optionalAnalytics = async () => {
	if (settings.settings.optionalAnalytics === true && dev === false) {
		const payload = JSON.stringify(await optionalAnalyticsPayload())

		fetch("https://analytics.levminer.com/api/v1/authme/analytics/post", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: payload,
		})
	}
}

optionalAnalytics()
checkForUpdate()
