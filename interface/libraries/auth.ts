const ALGORITHM = {
	BLOCK_CIPHER: "aes-256-gcm",
	AUTH_TAG_BYTE_LEN: 16,
	IV_BYTE_LEN: 12,
	KEY_BYTE_LEN: 32,
	SALT_BYTE_LEN: 16,
}

/**
 * Generate salt
 * @return {Buffer} salt
 */
export const generateSalt = () => {
	return Buffer.from(window.crypto.getRandomValues(new Uint8Array(16)))
}

/**
 * Generate random key
 * @param {Buffer|string} salt
 * @return {Buffer} key
 */
export const generateRandomKey = async (salt: Buffer) => {
	return Buffer.from(window.crypto.getRandomValues(new Uint8Array(32)))
}

/**
 * Generate key from password and salt
 * @param {Buffer} password
 * @param {Buffer} key
 * @return {Buffer} masterKey
 */
export const generateMasterKey = async (password: Buffer, key: Buffer) => {
	const keyMaterial = await window.crypto.subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits", "deriveKey"])

	return window.crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: key,
			iterations: 100000,
			hash: "SHA-256",
		},
		keyMaterial,
		{ name: "AES-GCM", length: 256 },
		true,
		["encrypt", "decrypt"]
	)
}

/**
 * Encrypt a string
 * @param {string} text
 * @param {Buffer} masterKey
 * @return {Buffer} encrypted text
 */
export const encrypt = async (text: string, masterKey: CryptoKey) => {
	const iv = window.crypto.getRandomValues(new Uint8Array(12))
	const encoder = new TextEncoder()

	const encrypted = await window.crypto.subtle.encrypt(
		{
			name: "AES-GCM",
			iv,
		},
		masterKey,
		encoder.encode(text)
	)

	let value = Buffer.from(encrypted).toString("base64")
	value += `@${Buffer.from(iv).toString("base64")}`

	return value
}

/**
 * Decrypt a string
 * @param {Buffer} text
 * @param {Buffer} masterKey
 * @returns {Buffer} decrypted text
 */
export const decrypt = async (text: string, masterKey: CryptoKey) => {
	const value = text.split("@")

	const ciphertext = Buffer.from(value[0], "base64")
	const iv = Buffer.from(value[1], "base64")

	const decrypted = await window.crypto.subtle.decrypt(
		{
			name: "AES-GCM",
			iv,
		},
		masterKey,
		ciphertext
	)

	const dec = new TextDecoder()

	return dec.decode(decrypted)
}

/**
 *
 * @param {string|Buffer} text
 * @returns {string} sha512 text
 */
/* export const hash = (text: string | Buffer): string => {
	return crypto.createHash("sha512").update(text).digest("base64")
} */
