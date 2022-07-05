import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

// https://vitejs.dev/config/
export default defineConfig({
	root: "interface",
	build: {
		outDir: "../dist",
		emptyOutDir: true,
	},
	plugins: [svelte()],
})
