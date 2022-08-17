import QrcodeDecoder from "qrcode-decoder"
import { fs, dialog } from "@tauri-apps/api"
import { getState, setState } from "../../stores/state"
import { totpImageConverter, migrationImageConverter } from "../../libraries/convert"
import { navigate } from "../../libraries/navigate"

/**
 * Choose images, then read QR codes
 */
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

	let importString = ""

	for (let i = 0; i < images.length; i++) {
		const processImages = async () => {
			const qr = new QrcodeDecoder()

			// Decode image
			const res = await qr.decodeFromImage(images[i])

			if (res === false) {
				// No qr code found on the picture
				dialog.message(`No QR code found on the #${i + 1} picture! \n\nPlease try again with another picture!`, { type: "error" })
			} else if (res.data.startsWith("otpauth://totp/") || res.data.startsWith("otpauth-migration://")) {
				if (res.data.startsWith("otpauth://totp/")) {
					importString += totpImageConverter(res.data)
				} else {
					importString += migrationImageConverter(res.data)
				}

				if (images.length === i + 1) {
					// QR codes found on all images
					dialog.message("Codes imported. \n\nYou can edit your codes on the edit page.")

					const state = getState()
					state.importData += importString
					setState(state)

					navigate("codes")
				}
			} else {
				// Wrong QR code found
				dialog.message(`Wrong QR code found on the #${i + 1} picture! \n\nPlease try again with another picture!`, { type: "error" })
			}
		}

		processImages()
	}
}

/**
 * Show manual entry dialog
 */
export const showManualEntry = () => {
	const dialog: LibDialogElement = document.querySelector(".dialog0")
	const closeDialog = document.querySelector(".dialog0Close")

	closeDialog.addEventListener("click", () => {
		document.querySelector(".name").value = ""
		document.querySelector(".secret").value = ""
		document.querySelector(".description").value = ""

		dialog.close()
	})

	dialog.showModal()
}

/**
 * Enter a TOTP code manually
 */
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

	const importString = `\nName:   ${name} \nSecret: ${secret} \nIssuer: ${issuer} \nType:   OTP_TOTP\n`

	const state = getState()
	state.importData += importString
	setState(state)

	navigate("codes")
}

/**
 * Import all codes from an .authme file
 */
export const chooseFile = async () => {
	const state = getState()
	const filePath = await dialog.open({ filters: [{ name: "Authme file", extensions: ["authme"] }] })

	if (filePath !== null) {
		const loadedFile = await fs.readTextFile(filePath.toString())
		const file: LibAuthmeFile = JSON.parse(loadedFile)
		const importString = Buffer.from(file.codes, "base64").toString()

		dialog.message("Codes imported. \n\nYou can edit your codes on the edit page.")

		state.importData = importString
		setState(state)

		navigate("codes")
	}
}

/**
 * Start a video capture, when a QR code detected try to read it
 */
export const captureScreen = async () => {
	const dialogElement: LibDialogElement = document.querySelector(".dialog1")
	const videoElement: HTMLVideoElement = document.querySelector(".video")

	try {
		videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia({ audio: false })

		const track = videoElement.srcObject.getTracks()[0]

		dialogElement.showModal()

		document.querySelector(".stopVideo").addEventListener("click", () => {
			reader.stop()
			track.stop()

			dialogElement.close()
		})

		const reader = new QrcodeDecoder()

		const res = await reader.decodeFromVideo(videoElement)

		let importString = ""

		if (res.data.startsWith("otpauth://totp/") || res.data.startsWith("otpauth-migration://")) {
			if (res.data.startsWith("otpauth://totp/")) {
				importString += totpImageConverter(res.data)
			} else {
				importString += migrationImageConverter(res.data)
			}

			const state = getState()
			state.importData += importString
			setState(state)

			reader.stop()
			track.stop()

			dialog.message("Codes imported. \n\nYou can edit your codes on the edit page.")

			navigate("codes")
		} else {
			// Wrong QR code found
			dialog.message("Wrong QR code found on the picture! \n\nPlease try again with another picture!", { type: "error" })
			console.error("Wrong QR code found on the picture:", res)
		}
	} catch (err) {
		console.error(`Error: ${err}`)

		dialog.message(`Error occurred during the screen capture: \n\n${err}`, { type: "error" })
	}
}
