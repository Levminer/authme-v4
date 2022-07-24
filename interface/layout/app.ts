import App from "./app.svelte"
import "../styles/index.css"
import { fs, path, os } from "@tauri-apps/api"

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

const app = new App({
	target: document.body,
})

export default app
