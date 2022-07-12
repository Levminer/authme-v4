import protobuf from "protocol-buffers"
import { encode } from "./base32"

const protoContent = `
syntax = "proto3";
package googleauth;
message MigrationPayload {
enum Algorithm {
    ALGO_INVALID = 0;
    ALGO_SHA1 = 1;
}
enum OtpType {
    OTP_INVALID = 0;
    OTP_HOTP = 1;
    OTP_TOTP = 2;
}
message OtpParameters {
    bytes secret = 1;
    string name = 2;
    string issuer = 3;
    Algorithm algorithm = 4;
    int32 digits = 5;
    OtpType type = 6;
    int64 counter = 7;
}
repeated OtpParameters otp_parameters = 1;
int32 version = 2;
int32 batch_size = 3;
int32 batch_index = 4;
int32 batch_id = 5;
}
`
/**
 * Convert Google Authenticator export QR code to Authme Import file structure
 * @param {string} url
 * @return {LibCodesFormat[]} arr
 */
export const googleAuthenticatorConverter = (url: string): LibCodesFormat[] => {
	const buffer = Buffer.from(decodeURIComponent(url), "base64")
	const proto = protobuf(protoContent)
	const data = proto.MigrationPayload.decode(buffer).otp_parameters

	const arr: LibCodesFormat[] = []

	for (let i = 0; i < data.length; i++) {
		const secret = encode(data[i].secret)

		const obj: LibCodesFormat = {
			name: data[i].name,
			secret: secret.replaceAll("=", ""),
			issuer: data[i].issuer,
		}

		if (obj.issuer === "") {
			obj.issuer = obj.name
		}

		arr.push(obj)
	}

	return arr
}

/**
 * Convert codes from plain text to arrays
 * @param {string} text
 * @param {number} sortNumber
 * @return {LibImportFile} Import file structure
 */
export const textConverter = (text: string, sortNumber: number): LibImportFile => {
	const data: string[] = []
	let names: string[] = []
	let secrets: string[] = []
	const issuers: string[] = []
	const types: string[] = []

	// remove double quotes, next line, split new lines
	const convertedText = text.replace(/"/g, "").replace(/,/g, "\n").split(/\n/)

	// create array
	while (convertedText.length) {
		data.push(convertedText.shift())
	}

	// remove first blank line
	data.splice(0, 1)

	// remove blank strings
	for (let i = 0; i < data.length; i++) {
		if (data[i] === "" || data[i] === "\r" || data[i] === "\n" || data[i] === "\r\n") {
			data.splice(i, 1)
		}
	}

	for (let i = 0; i < data.length; i++) {
		// Push names to array
		if (data[i].startsWith("Name")) {
			const name = data[i].slice(8).trim()

			if (name.length > 40) {
				names.push(`${name.slice(0, 38)}...`)
			} else {
				names.push(name)
			}
		}

		// Push secrets to array
		if (data[i].startsWith("Secret")) {
			const secret = data[i].slice(8).trim()

			secrets.push(secret)
		}

		// Push issuers to array
		if (data[i].startsWith("Issuer")) {
			const issuer = data[i].slice(8).trim()

			if (issuer.length > 16) {
				issuers.push(`${issuer.slice(0, 14)}...`)
			} else {
				issuers.push(issuer)
			}
		}

		// Push types to array
		if (data[i].startsWith("Type")) {
			const type = data[i].slice(8).trim()

			types.push(type)
		}
	}

	// Sort codes
	const originalIssuers = [...issuers]

	const sort = () => {
		const newNames = []
		const newSecrets = []

		issuers.forEach((element) => {
			for (let i = 0; i < originalIssuers.length; i++) {
				if (element === originalIssuers[i]) {
					newNames.push(names[i])
					newSecrets.push(secrets[i])
				}
			}
		})

		names = newNames
		secrets = newSecrets
	}

	if (sortNumber === 1) {
		issuers.sort((a, b) => {
			return a.localeCompare(b)
		})

		sort()
	} else if (sortNumber === 2) {
		issuers.sort((a, b) => {
			return b.localeCompare(a)
		})

		sort()
	}

	return {
		names,
		secrets,
		issuers,
		types,
	}
}
