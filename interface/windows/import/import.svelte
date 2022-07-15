<div class="transparent-900 m-auto my-20 w-4/5 rounded-2xl p-10 text-left">
	<h1 class="px-10">Supported QR codes</h1>
	<div class="mx-auto flex flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>TOTP 2FA QR code</h2>
				<h3>A TOTP QR code is that you find mostly everywhere, if you want to setup 2FA. Consist of 6 digits which are changing every 30 seconds.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<button class="button requirePassword">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					More information
				</button>
			</div>
		</div>

		<div class="transparent-800 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Google Authenticator QR code</h2>
				<h3>A Google Authenticator code is what you can export, and contains all of your already imported codes.</h3>
			</div>
			<div class="ml-20 flex gap-3">
				<button class="button requirePassword">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					More information
				</button>
			</div>
		</div>
	</div>
</div>

<div class="transparent-900 m-auto mb-20 w-4/5 rounded-2xl p-10 text-left">
	<h1 class="px-10">Choose import method</h1>
	<div class="mx-auto flex flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Import from images</h2>
				<h3>Choose images that contain a 2FA QR code.</h3>
			</div>
			<div class="ml-10 flex gap-3">
				<button class="button requirePassword" on:click={chooseImages}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<line x1="15" y1="8" x2="15.01" y2="8" />
						<rect x="4" y="4" width="16" height="16" rx="3" />
						<path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
						<path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
					</svg>
					Choose images
				</button>
			</div>
		</div>

		<div class="transparent-800 mb-5 flex w-full flex-row items-center justify-between rounded-xl p-5 text-left">
			<div>
				<h2>Enter secret manually</h2>
				<h3>Enter a TOTP secret key and name manually.</h3>
			</div>
			<div class="ml-10 flex gap-3">
				<button class="button">
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
					<span>Manual entry</span>
				</button>
			</div>
		</div>

		<Details>
			<div class="flex justify-between">
				<div>
					<h4>Webcam</h4>
					<h5>Use your webcam to scan a 2FA QR code.</h5>
				</div>
				<div>
					<button class="smallButton">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<circle cx="12" cy="10" r="7" />
							<circle cx="12" cy="10" r="3" />
							<path d="M8 16l-2.091 3.486a1 1 0 0 0 .857 1.514h10.468a1 1 0 0 0 .857 -1.514l-2.091 -3.486" />
						</svg>
						Use webcam
					</button>
				</div>
			</div>
			<div class="mt-5 flex justify-between">
				<div>
					<h4>Screen capture</h4>
					<h5>Capture a 2FA QR code from your screen.</h5>
				</div>
				<div>
					<button class="smallButton">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<rect x="3" y="4" width="18" height="12" rx="1" />
							<line x1="7" y1="20" x2="17" y2="20" />
							<line x1="9" y1="16" x2="9" y2="20" />
							<line x1="15" y1="16" x2="15" y2="20" />
						</svg>
						Capture screen
					</button>
				</div>
			</div>
		</Details>
	</div>
</div>

<script>
	import { onDestroy } from "svelte"
	import { chooseImages } from "./index"
	import Details from "../../components/details.svelte"
	import { state } from "../../stores/state"

	/* const stateSubscriber = state.subscribe((value) => {
		console.log(value)
	})

	state.set({ importData: "asd" })

	onDestroy(() => {
		stateSubscriber()
	}) */
</script>
