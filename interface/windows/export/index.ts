import { fs, path, dialog } from "@tauri-apps/api"
import { generateMasterKey, decrypt } from "../../libraries/auth"
import { generateTimestamp } from "../../libraries/time"
import { textConverter } from "../../libraries/convert"
import { getSettings } from "../../stores/settings"
import qrcode from "qrcode-generator"

let codesArray: LibImportFile
let codesText: string

export const exportCodes = async () => {
	const settings = getSettings()
	const filePath = await path.join(await path.configDir(), "Levminer", "Authme 4", "codes", "codes.authme")

	try {
		const saveFile: LibAuthmeFile = JSON.parse(await fs.readTextFile(filePath))

		document.querySelector(".saveExportedCodes").style.display = "block"
		document.querySelector(".exportCodes").style.display = "none"

		const password = Buffer.from(settings.security.password, "base64")
		const key = Buffer.from(settings.security.key, "base64")

		const masterKey = await generateMasterKey(password, key)
		const decrypted = await decrypt(saveFile.codes, masterKey)

		codesArray = textConverter(decrypted, 0)
		codesText = decrypted
	} catch (error) {
		return dialog.message("No save file found. \n\nGo to the codes or the import page and import your codes!", { type: "error" })
	}
}

export const exportAuthmeFile = async () => {
	const saveFile: LibAuthmeFile = {
		role: "codes",
		encrypted: false,
		codes: Buffer.from(codesText).toString("base64"),
		date: generateTimestamp(),
		version: 3,
	}

	const filePath = await dialog.save({ filters: [{ name: "Authme file", extensions: ["authme"] }] })

	if (filePath !== null) {
		fs.writeFile(filePath, JSON.stringify(saveFile, null, "\t"))
	}
}

export const exportHtmlFile = async () => {
	const names = codesArray.names
	const secrets = codesArray.secrets
	const issuers = codesArray.issuers

	let htmlString = ""

	for (let i = 0; i < names.length; i++) {
		const qr = qrcode(10, "M")

		qr.addData(`otpauth://totp/${names[i]}?secret=${secrets[i]}&issuer=${issuers[i]}`)
		qr.make()

		const qrSrc = qr.createDataURL(3, 3)

		const element = `
			<div>
				<img class="img" src="${qrSrc}">
				<h1 style=font-family:Arial;>${issuers[i]}</h1>
			</div>`

		htmlString += element
	}

	const filePath = await dialog.save({ filters: [{ name: "HTML file", extensions: ["html"] }] })

	if (filePath !== null) {
		fs.writeFile(filePath, htmlString)
	}
}
