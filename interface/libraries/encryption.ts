import { invoke } from "@tauri-apps/api"

/**
 * Generates random key
 */
export const generateRandomKey = async (): Promise<Buffer> => {
	return Buffer.from(window.crypto.getRandomValues(new Uint8Array(32)))
}

/**
 * Sets an entry on the system keychain
 */
export const setEntry = async (name: string, data: string) => {
	await invoke("set_entry", { name, data })
}

/**
 * Gets an entry on the system keychain
 */
export const getEntry = async (name: string): Promise<string> => {
	return await invoke("get_entry", { name })
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
	return await invoke("decrypt_data", { data })
}

/**
 * Set the encryption key on the backend
 */
export const setEncryptionKey = async () => {
	return await invoke("set_encryption_key")
}

/**
 * Set the encryption key on the backend
 */
export const sendEncryptionKey = async (key: string) => {
	return await invoke("receive_encryption_key", { key })
}
