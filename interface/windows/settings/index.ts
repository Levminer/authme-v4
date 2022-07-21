import { resetState } from "../../stores/state"
import { resetSettings } from "../../stores/settings"
import build from "../../../build.json"
import { fs, path, invoke, os, dialog, app } from "@tauri-apps/api"
import { UAParser } from "ua-parser-js"
import { navigate } from "../../libraries/navigate"

export const about = async () => {
	const appVersion = await app.getVersion()
	const tauriVersion = await app.getTauriVersion()
	const osType = await os.type()
	const osArch = await os.arch()
	const osVersion = await os.version()
	const chromeVersion = new UAParser().getBrowser().version

	let hardware: any = await invoke("system_info")

	hardware = hardware.split("+")

	const cpu = hardware[0]
		.split("@")[0]
		.replaceAll("(R)", "")
		.replaceAll("(TM)", "")
		.replace(/ +(?= )/g, "")
	const memory = `${Math.round(hardware[1] / 1024 / 1024)}GB`

	dialog.message(`Authme: ${appVersion} \n\nTauri: ${tauriVersion}\nChrome: ${chromeVersion}\n\nOS version: ${osType} ${osArch.replace("x86_64", "x64")} ${osVersion}\nHardware info: ${cpu}${memory} RAM\n\nRelease date: ${build.date}\nBuild number: ${build.number}\n\nCreated by: Lőrik Levente`)
}

export const clearData = async () => {
	localStorage.clear()
	sessionStorage.clear()

	const folderPath = await path.join(await path.configDir(), "Levminer", "Authme 4")
	await fs.removeDir(folderPath, { recursive: true })

	resetState()
	resetSettings()

	navigate("/")
	location.reload()
}
