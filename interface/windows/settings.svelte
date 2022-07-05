<div class="flex h-screen ">
	<!-- sidebar -->
	<div class="transparent-900 flex h-screen flex-col justify-between overflow-visible">
		<div class="flex flex-col">
			<div class="mb-1 mt-5 mr-4 ml-4">
				<button id="general " class="buttonm general">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<span data-loc>General</span>
				</button>
			</div>
			<div class="mb-1 mt-1 mr-4 ml-4">
				<button id="codes " class="buttonm codes">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
					</svg>
					<span data-loc>Codes</span>
				</button>
			</div>
			<div class="mb-1 mt-1 mr-4 ml-4">
				<button id="shortcuts " class="buttonm shortcuts">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<rect x="2" y="6" width="20" height="12" rx="2" />
						<line x1="6" y1="10" x2="6" y2="10" />
						<line x1="10" y1="10" x2="10" y2="10" />
						<line x1="14" y1="10" x2="14" y2="10" />
						<line x1="18" y1="10" x2="18" y2="10" />
						<line x1="6" y1="14" x2="6" y2="14.01" />
						<line x1="18" y1="14" x2="18" y2="14.01" />
						<line x1="10" y1="14" x2="14" y2="14" />
					</svg>
					<span data-loc>Shortcuts</span>
				</button>
			</div>
			<div class="mb-1 mt-1 mr-4 ml-4">
				<button id="experimental " class="buttonm experimental">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
					</svg>
					<span data-loc>Experimental</span>
				</button>
			</div>
		</div>
		<div class="flex-flex-col">
			<div class="mb-1 mt-1 mr-4 ml-4">
				<button class="buttonm">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
						<line x1="8" y1="9" x2="16" y2="9" />
						<line x1="8" y1="13" x2="14" y2="13" />
					</svg>
					<span data-loc>Feedback</span>
				</button>
			</div>
			<div class="mb-12 mt-1 mr-4 ml-4">
				<button class="buttonm">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span data-loc>Version</span>
				</button>
			</div>
		</div>
	</div>

	<div class="flex flex-1 flex-col overflow-y-scroll">
		<!-- header -->
		<div class="transparent-900 m-auto mt-40 mb-60 w-4/5 rounded-2xl p-10 text-left">
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
	</div>
</div>

<script>
	import Dropdown from "../components/dropdown.svelte"

	import Toggle from "../components/toggle.svelte"

	const handleMessage = (event) => {
		console.log(event.detail.value)
	}
</script>
