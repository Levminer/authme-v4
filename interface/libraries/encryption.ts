import { invoke, dialog } from "@tauri-apps/api"

/**
 * Generates random key
 */
export const generateRandomKey = async (): Promise<Buffer> => {
	return Buffer.from(window.crypto.getRandomValues(new Uint8Array(32)))
}

/**
 * Encrypts a string with the encryption key
 */
export const encryptData = async (data: string): Promise<string> => {
	return await invoke("encrypt_data", { data })
}

/**
 * Decrypts a string with the encryption key
 */
export const decryptData = async (data: string): Promise<string> => {
	const res: string = await invoke("decrypt_data", { data })

	if (res === "error") {
		dialog.message("Failed to decrypt your codes!\n\n Please restart the app and try again!", { type: "error" })
	}

	return res
}

/**
 * Sets an entry on the system keychain
 */
export const setEntry = async (name: string, data: string) => {
	await invoke("set_entry", { name, data })
}

/**
 * Set the encryption key on the backend
 */
export const setEncryptionKey = async () => {
	const res: string = await invoke("set_encryption_key")

	if (res === "error") {
		dialog.message("Failed to set the encryption key on your systems keychain!\n\n Please restart the app and try again!", { type: "error" })
	}

	return res
}

/**
 * Set the encryption key on the backend
 */
export const sendEncryptionKey = async (key: string) => {
	return await invoke("receive_encryption_key", { key })
}

/**
 * Delete encryption key
 */
export const deleteEncryptionKey = async (name: string) => {
	return await invoke("delete_entry", { name })
}
