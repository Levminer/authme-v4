<div class="transparent-900 m-auto my-20 w-4/5 rounded-2xl p-10 text-left">
	<h1 class="px-10">General</h1>

	<div class="mx-auto flex flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Launch on startup</h2>
				<h3>Start Authme after your computer started. Authme will start on the system tray.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<Toggle />
			</div>
		</div>

		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Mimimize to tray</h2>
				<h3>When closeing the app Authme will not quit. You can open Authme from the system tray.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<Toggle />
			</div>
		</div>

		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Optional analytics</h2>
				<h3>Send optional analytics, the sent data is completely anonymous. This includes your Authme version and your OS version.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<Toggle />
			</div>
		</div>

		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Clear data</h2>
				<h3>Clear password, 2FA codes and all other settings. Be careful.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<button class="button" on:click={clearData}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
					Clear data
				</button>
			</div>
		</div>
	</div>
</div>

<div class="transparent-900 m-auto my-20 w-4/5 rounded-2xl p-10 text-left">
	<h1 class="px-10">Codes</h1>

	<div class="mx-auto flex flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Codes description</h2>
				<h3>The saved codes description will be visible. You can copy it after clicking it.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<Toggle />
			</div>
		</div>

		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Blur codes</h2>
				<h3>Blur the saved codes. You can still copy the codes or hover over the codes to show them.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<Toggle />
			</div>
		</div>

		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Search history</h2>
				<h3>Save the latest code you searched for. Works even after restart.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<Toggle />
			</div>
		</div>

		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Sort codes</h2>
				<h3>You can choose how to sort the codes. By default codes are sorted by importing order.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<Dropdown on:message={handleMessage} />
			</div>
		</div>
	</div>
</div>

<div class="transparent-900 m-auto my-20 w-4/5 rounded-2xl p-10 text-left">
	<h1 class="px-10">About</h1>

	<div class="mx-auto flex flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Licenses</h2>
				<h3>Authme is an open source software. You can view the licenses.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<button class="button" on:click={about}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<circle cx="12" cy="12" r="9" />
						<path d="M14.5 9a3.5 4 0 1 0 0 6" />
					</svg>
					View licenses
				</button>
			</div>
		</div>
		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Logs</h2>
				<h3>You can view the logs for debugging. You can view all the logs in the settings folder.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<button class="button" on:click={about}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Show logs
				</button>
			</div>
		</div>

		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>About Authme</h2>
				<h3>Information about your Authme build.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<button class="button" on:click={about}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					About Authme
				</button>
			</div>
		</div>
	</div>
</div>

<script>
	import Dropdown from "../../components/dropdown.svelte"
	import Toggle from "../../components/toggle.svelte"
	import { about, clearData } from "./index"

	const handleMessage = (event) => {
		console.log(event.detail.value)
	}
</script>
