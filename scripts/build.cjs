const { existsSync, mkdirSync, writeFileSync } = require("fs")
const package = require("../package.json")

const build = new Date().toISOString().replace("T", "X").replaceAll(":", ".").substring(0, 19).replaceAll("-", ".").slice(2).replaceAll(".", "").replace("X", ".")

const date = new Date()

const year = date.getFullYear()
const month = date.toLocaleString("en-us", { timeZone: "UTC", month: "long" })
const day = date.toISOString().substring(8, 10)

const buildNumber = `${process.argv[2]}.${build}`
const releaseDate = `${year}. ${month} ${day}.`

const file = {
	number: buildNumber,
	date: releaseDate,
	version: package.version,
	arch: process.arch,
	dev: process.argv[3],
}

if (!existsSync("core/target/release")) {
	mkdirSync("core/target/release", { recursive: true })
}

writeFileSync("build.json", JSON.stringify(file, null, "\t"))
writeFileSync("core/target/release/build.json", JSON.stringify(file, null, "\t"))
