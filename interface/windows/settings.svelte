<div class="transparent-900 m-auto mt-40 mb-60 w-4/5 rounded-2xl p-10 text-left">
	<h1 class="ml-1">Settings</h1>
	<div class="transparent-800 my-10 flex flex-row items-center justify-between rounded-xl p-5">
		<div>
			<h2>Launch on startup</h2>
			<h3>Start Authme after your computer started. Authme will start on the system tray.</h3>
		</div>
		<div class="ml-10 flex gap-3">
			<Toggle />
		</div>
	</div>

	<div class="transparent-800 my-10 flex flex-row items-center justify-between rounded-xl p-5">
		<div>
			<h2>Language</h2>
			<h3>Choose which language should Authme use by default. The translations are not perfect and changing the language requires a restart.</h3>
		</div>
		<div class="ml-10 flex gap-3">
			<Dropdown on:message={handleMessage} />
		</div>
	</div>

	<div class="transparent-800 my-10 flex flex-row items-center justify-between rounded-xl p-5">
		<div>
			<h2>Clear data</h2>
			<h3>Clear password, 2FA codes and all other settings. Be careful.</h3>
		</div>
		<div class="ml-10 flex gap-3">
			<button class="button">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
				Clear data
			</button>
		</div>
	</div>

	<div class="transparent-800 my-10 flex flex-row items-center justify-between rounded-xl p-5">
		<div>
			<h2>Input</h2>
			<h3>Clear password, 2FA codes and all other settings. Be careful.</h3>
		</div>
		<div class="ml-10 flex gap-3">
			<input class="input" type="text" />
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
