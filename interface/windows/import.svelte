<div class="transparent-900 m-auto mt-40 mb-60 w-3/5 rounded-2xl p-10 text-center">
	<h1>Supported QR codes</h1>
	<div class="mx-auto flex w-4/5 flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-10 w-full rounded-2xl p-5">
			<h2>Available options</h2>
			<h3>List of the currently supported QR codes. You can import from more types at the same time.</h3>
		</div>

		<div class="mb-10 flex w-full flex-row justify-center gap-2 sm:flex-wrap">
			<div class="transparent-800 my-5 flex w-1/2 flex-wrap items-center justify-center rounded-2xl p-5 sm:w-full">
				<h4 class="mb-3">TOTP 2FA QR code</h4>
				<h5 class="mb-3">A TOTP QR code is that you find mostly everywhere, if you want to setup 2FA. Consist of 6 digits which are changing every 30 seconds.</h5>
				<a class="link" href="http://">More info</a>
			</div>
			<div class="transparent-800 my-5 flex w-1/2 flex-wrap items-center justify-center rounded-2xl p-5 sm:w-full">
				<h4 class="mb-3">Google Authenticator QR code</h4>
				<h5 class="mb-3">A Google Authenticator code is what you can export, and contains all of your already imported codes.</h5>
				<a class="link" href="http://">More info</a>
			</div>
		</div>
	</div>
</div>

<div class="transparent-900 m-auto mt-40 mb-60 w-3/5 rounded-2xl p-10 text-center">
	<h1>Import codes</h1>
	<div class="mx-auto flex w-4/5 flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-10 w-full rounded-2xl p-5">
			<h2>Choose method</h2>
			<h3>You can import your 2FA codes many way. Choose the most convenient way for you.</h3>
		</div>

		<div class="mb-10 flex w-full flex-row justify-center gap-2 sm:flex-wrap">
			<div class="transparent-800 my-5 flex w-1/2 flex-wrap items-center justify-center rounded-2xl p-5 sm:w-full">
				<h4 class="mb-3">Import from images</h4>
				<h5 class="mb-3">Choose images that contain a 2FA QR code.</h5>

				<button class="button requirePassword">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<line x1="15" y1="8" x2="15.01" y2="8" />
						<rect x="4" y="4" width="16" height="16" rx="3" />
						<path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
						<path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
					</svg>
					<span>Choose images</span>
				</button>
			</div>
			<div class="transparent-800 my-5 flex w-1/2 flex-wrap items-center justify-center rounded-2xl p-5 sm:w-full">
				<h4 class="mb-3">Enter secret manually</h4>
				<h5 class="mb-3">Enter a TOTP secret key and name manually.</h5>

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
	</div>
</div>
