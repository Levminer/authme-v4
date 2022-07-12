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
				<h2>Close to tray</h2>
				<h3>When closing Authme the app will not quit. You can open Authme from the system tray.</h3>
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
				<button class="button">
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

<script>
	import Dropdown from "../components/dropdown.svelte"

	import Toggle from "../components/toggle.svelte"

	const handleMessage = (event) => {
		console.log(event.detail.value)
	}
</script>
