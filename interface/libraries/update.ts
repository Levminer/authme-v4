import { updater, event, dialog } from "@tauri-apps/api"
import { relaunch } from "@tauri-apps/api/process"
import { getState, setState } from "interface/stores/state"
import { dev } from "../../build.json"

const state = getState()
let releaseNotes: string

/**
 * Check for auto update
 */
export const checkForUpdate = async () => {
	if (dev === false) {
		try {
			const { shouldUpdate, manifest } = await updater.checkUpdate()
			if (shouldUpdate) {
				releaseNotes = manifest.body

				console.log(manifest)

				state.updateAvailable = true

				setState(state)
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export const installUpdate = async () => {
	await updater.installUpdate()
	await relaunch()
}

export const showReleaseNotes = () => {
	dialog.message(releaseNotes)
}

event.listen("tauri://update-status", (res) => {
	console.log("New status: ", res)
})
