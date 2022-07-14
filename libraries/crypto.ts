import crypto from "crypto"

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
export const generateSalt = (): Buffer => {
	return crypto.randomBytes(ALGORITHM.SALT_BYTE_LEN)
}

/**
 * Generate random key
 * @param {Buffer|string} salt
 * @return {Buffer} key
 */
export const generateRandomKey = (salt: Buffer | string): Buffer => {
	const key = crypto.randomBytes(ALGORITHM.KEY_BYTE_LEN)
	return crypto.scryptSync(key, salt, ALGORITHM.KEY_BYTE_LEN)
}

/**
 * Generate key from password and salt
 * @param {Buffer} password
 * @param {Buffer} salt
 * @return {Buffer} key
 */
export const generateKey = (password: Buffer, salt: Buffer): Buffer => {
	return crypto.scryptSync(password, salt, ALGORITHM.KEY_BYTE_LEN)
}

/**
 * Encrypt a string
 * @param {string} text
 * @param {Buffer} key
 * @return {Buffer} encrypted text
 */
export const encrypt = (text: string, key: Buffer): Buffer => {
	const iv = crypto.randomBytes(ALGORITHM.IV_BYTE_LEN)
	const cipher = crypto.createCipheriv(ALGORITHM.BLOCK_CIPHER, key, iv, {
		// @ts-ignore
		authTagLength: ALGORITHM.AUTH_TAG_BYTE_LEN,
	})
	let encryptedMessage = cipher.update(text)
	encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()])
	return Buffer.concat([iv, encryptedMessage, cipher.getAuthTag()])
}

/**
 * Decrypt a string
 * @param {Buffer} text
 * @param {Buffer} key
 * @returns {Buffer} decrypted text
 */
export const decrypt = (text: Buffer, key: Buffer): Buffer => {
	const authTag = text.slice(-16)
	const iv = text.slice(0, 12)
	const encryptedMessage = text.slice(12, -16)
	const decipher = crypto.createDecipheriv(ALGORITHM.BLOCK_CIPHER, key, iv, {
		// @ts-ignore
		authTagLength: ALGORITHM.AUTH_TAG_BYTE_LEN,
	})
	decipher.setAuthTag(authTag)
	const messageText = decipher.update(encryptedMessage)
	return Buffer.concat([messageText, decipher.final()])
}

/**
 *
 * @param {string|Buffer} text
 * @returns {string} sha512 text
 */
export const hash = (text: string | Buffer): string => {
	return crypto.createHash("sha512").update(text).digest("base64")
}
