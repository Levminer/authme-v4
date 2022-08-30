import { navigate } from "../../libraries/navigate"
import { getSettings } from "../../stores/settings"
import { dialog, invoke } from "@tauri-apps/api"
import { getState, setState } from "../../stores/state"

export const confirmPassword = async () => {
	const settings = getSettings()
	const input = document.querySelector(".passwordInput").value

	const result = await invoke("verify_password", { password: input, hash: Buffer.from(settings.security.password, "base64").toString() })

	if (result === true) {
		const state = getState()

		state.encryptionKey = input
		state.authenticated = true
		setState(state)

		navigate("codes")
	} else {
		dialog.message("Passwords don't match! \n\nPlease try again!", { type: "error" })
	}
}

export const showPassword = () => {
	const inputState = document.querySelector(".passwordInput").getAttribute("type")

	if (inputState === "password") {
		document.querySelector(".showPassword").style.display = "none"
		document.querySelector(".hidePassword").style.display = "block"

		document.querySelector(".passwordInput").setAttribute("type", "text")
	} else {
		document.querySelector(".showPassword").style.display = "block"
		document.querySelector(".hidePassword").style.display = "none"

		document.querySelector(".passwordInput").setAttribute("type", "password")
	}
}
