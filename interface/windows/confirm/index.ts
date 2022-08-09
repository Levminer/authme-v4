import { navigate } from "../../libraries/navigate"
import { getSettings } from "../../stores/settings"
import { dialog, invoke } from "@tauri-apps/api"

export const confirmPassword = async () => {
	const settings = getSettings()
	const input = document.querySelector(".passwordInput").value

	const result = await invoke("verify_password", { password: input, hash: settings.security.password })

    console.log(result)
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
