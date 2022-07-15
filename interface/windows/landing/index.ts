import { navigate } from "../../../libraries/navigate"
import { generateRandomKey, generateSalt } from "../../../libraries/auth"
import { getSettings, setSettings } from "../../stores/settings"
import { getState, setState } from "../../stores/state"

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
