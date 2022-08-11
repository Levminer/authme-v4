import { navigate } from "../../libraries/navigate"
import { generateRandomKey, generateSalt } from "../../libraries/auth"
import { getSettings, setSettings } from "../../stores/settings"
import { getState, setState } from "../../stores/state"
import { dialog, invoke } from "@tauri-apps/api"

export const noPassword = async () => {
	const settings = getSettings()
	const state = getState()

	const key = generateSalt()
	const password = await generateRandomKey(key)

	settings.security.key = key.toString("base64")
	settings.security.password = password.toString("base64")
	settings.security.requireAuthentication = false

	state.authenticated = true

	setSettings(settings)
	setState(state)

	navigate("codes")
}

export const requirePassword = () => {
	document.querySelector(".requirePassword").style.display = "block"
	document.querySelector(".landing").style.display = "none"
}

export const createPassword = async () => {
	const settings = getSettings()

	const input0 = document.querySelector(".passwordInput0")
	const input1 = document.querySelector(".passwordInput1")

	if (input0.value !== input1.value) {
		return dialog.message("Passwords don't match. \n\nPlease try again!", { type: "error" })
	}

	if (input0.value.length < 8) {
		return dialog.message("Minimum password length is 8 characters. \n\nPlease try again!", { type: "error" })
	} else if (input0.value.length > 64) {
		return dialog.message("Maximum password length is 64 characters. \n\nPlease try again!", { type: "error" })
	}

	const password = Buffer.from(await invoke("encrypt_password", { password: input0.value }))

	const key = generateSalt()

	settings.security.key = key.toString("base64")
	settings.security.password = password.toString("base64")
	settings.security.requireAuthentication = true

	setSettings(settings)

	navigate("confirm")
}

export const appController = () => {
	const settings = getSettings()
	const state = getState()

	if (settings.security.requireAuthentication === false) {
		state.authenticated = true

		setState(state)

		navigate("codes")
	} else if (settings.security.requireAuthentication === true) {
		navigate("confirm")
	}
}

export const showPassword = (id: number) => {
	const inputState = document.querySelector(`.passwordInput${id}`).getAttribute("type")

	if (inputState === "password") {
		document.querySelector(`.showPassword${id}`).style.display = "none"
		document.querySelector(`.hidePassword${id}`).style.display = "block"

		document.querySelector(`.passwordInput${id}`).setAttribute("type", "text")
	} else {
		document.querySelector(`.showPassword${id}`).style.display = "block"
		document.querySelector(`.hidePassword${id}`).style.display = "none"

		document.querySelector(`.passwordInput${id}`).setAttribute("type", "password")
	}
}
