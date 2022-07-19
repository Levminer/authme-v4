import App from "./app.svelte"
import "../styles/index.css"
import { fs, path, window } from "@tauri-apps/api"

const getSettingsPath = async () => {
	const folderPath = await path.join(await path.configDir(), "Levminer", "Authme 4")
	fs.createDir(folderPath, { recursive: true })

	const settingsPath = await path.join(folderPath, "settings")
	fs.createDir(settingsPath, { recursive: true })

	const codesPath = await path.join(folderPath, "codes")
	fs.createDir(codesPath, { recursive: true })
}

getSettingsPath()

const app = new App({
	target: document.body,
})

export default app
