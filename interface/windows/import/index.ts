import QrcodeDecoder from "qrcode-decoder"
import { fs, dialog } from "@tauri-apps/api"
import { getState, setState } from "../../stores/state"
import { totpImageConverter, migrationImageConverter } from "../../libraries/convert"
import { navigate } from "../../libraries/navigate"

export const chooseImages = async () => {
	const filePaths = await dialog.open({ multiple: true, filters: [{ name: "Image file", extensions: ["jpg", "jpeg", "png", "bmp"] }] })

	if (filePaths === null) {
		return
	}

	const images: string[] = []

	for (let i = 0; i < filePaths.length; i++) {
		const file = await fs.readBinaryFile(filePaths[i])

		const blob = new Blob([file], { type: "application/octet-binary" })
		const url = URL.createObjectURL(blob)

		images.push(url)
	}

	let string = ""

	for (let i = 0; i < images.length; i++) {
		const processImages = async () => {
			const qr = new QrcodeDecoder()

			// decode image
			const res = await qr.decodeFromImage(images[i])

			if (res === false) {
				// no qr code found
				// return invoke("error", { invokeMessage: "No QR code found on the picture!\n\nPlease try again with another picture!" })
			} else if (res.data.startsWith("otpauth://totp/") || res.data.startsWith("otpauth-migration://")) {
				if (res.data.startsWith("otpauth://totp/")) {
					string += totpImageConverter(res.data)
				} else {
					string += migrationImageConverter(res.data)
				}

				if (images.length === i + 1) {
					// invoke("info", { invokeMessage: "QR code(s) found!" })

					const state = getState()
					state.importData += string
					setState(state)

					navigate("codes")
				}
			} else {
				// no qr code found
				// return invoke("error", { invokeMessage: "Wrong QR code found on the picture!\n\nPlease try again with another picture!" })
			}
		}

		processImages()
	}
}

export const manualEntry = () => {
	const issuer = document.querySelector(".name").value
	const secret = document.querySelector(".secret").value
	let name = document.querySelector(".description").value

	if (issuer === "") {
		return dialog.message("The name field is required. \n\nPlease try again!", { type: "error" })
	}

	if (secret === "") {
		return dialog.message("The secret field is required. \n\nPlease try again!", { type: "error" })
	}

	if (name === "") {
		name = issuer
	}

	const string = `\nName:   ${name} \nSecret: ${secret} \nIssuer: ${issuer} \nType:   OTP_TOTP\n`

	const state = getState()
	state.importData += string
	setState(state)

	navigate("codes")

	document.querySelector(".name").value = ""
	document.querySelector(".secret").value = ""
	document.querySelector(".description").value = ""
}
