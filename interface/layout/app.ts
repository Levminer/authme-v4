import App from "./app.svelte"
import "../styles/index.css"
import { fs, path, os, event } from "@tauri-apps/api"
import { navigate } from "../libraries/navigate"

const getSettingsPath = async () => {
	const folderPath = await path.join(await path.configDir(), "Levminer", "Authme 4")
	fs.createDir(folderPath, { recursive: true })

	const settingsPath = await path.join(folderPath, "settings")
	fs.createDir(settingsPath, { recursive: true })

	const codesPath = await path.join(folderPath, "codes")
	fs.createDir(codesPath, { recursive: true })
}

getSettingsPath()

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

// Tray event handler
event.listen("openSettings", () => {
	navigate("settings")
})

// Tray event handler
event.listen("focusSearch", () => {
	const path = location.pathname

	if (path === "/codes") {
		document.querySelector<HTMLInputElement>(".search").focus()
	}
})

// Create svelte app
const app = new App({
	target: document.body,
})

export default app
