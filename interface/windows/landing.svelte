<div class="transparent-900 m-auto mt-40 mb-60 w-3/5 rounded-2xl p-10 text-center">
	<h1>Welcome to Authme!</h1>

	<div class="mx-auto flex w-4/5 flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-10 w-full rounded-2xl p-5">
			<h2>Getting started</h2>
			<h3>Choose how you want to use Authme.</h3>
		</div>

		<div class="mb-10 flex w-full flex-row justify-center gap-2 sm:flex-wrap">
			<div class="transparent-800 my-5 flex w-1/2 flex-wrap items-center justify-center rounded-2xl p-5 sm:w-full">
				<h4 data-loc class="mb-3">Require password</h4>
				<h5 data-loc class="mb-3">You have to type in a password every time you launch Authme.</h5>

				<button class="button requirePassword">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span data-loc>Continue</span>
				</button>
			</div>
			<div class="transparent-800 my-5 flex w-1/2 flex-wrap items-center justify-center rounded-2xl p-5 sm:w-full">
				<h4 data-loc class="mb-3">No password</h4>
				<h5 data-loc class="mb-3">If you don't want to type in your password every time you launch Authme.</h5>

				<button class="button">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span data-loc>Confirm</span>
				</button>
			</div>
		</div>
		<Details>
			<div class="flex justify-between">
				<div>
					<h4>Go back</h4>
					<h5>Choose a different login method.</h5>
				</div>
				<div>
					<button class="button">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
						</svg>
						Go back
					</button>
				</div>
			</div>
		</Details>
	</div>
</div>

<div class="transparent-900 m-auto mt-40 mb-60 w-3/5 rounded-2xl p-10 text-center">
	<h1>Authme</h1>

	<div class="mx-auto flex w-4/5 flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-10 w-full rounded-2xl p-5">
			<h2>Create password</h2>
			<h3>Create a strong password to encrypt your codes.</h3>
		</div>

		<div class="transparent-800 mb-10 w-full rounded-2xl p-5">
			<div class="mx-auto flex w-full items-center justify-center gap-5 sm:flex-wrap ">
				<div class="flex flex-col items-center justify-center gap-2">
					<h5 class="">Password</h5>
					<input class="input" type="password" />
				</div>

				<div class="flex flex-col items-center justify-center gap-2">
					<h5>Confirm password</h5>
					<input class="input" type="password" />
				</div>
			</div>

			<button class="button mx-auto mt-10">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				Confirm
			</button>
		</div>

		<Details>
			<div class="flex justify-between">
				<div>
					<h4>Go back</h4>
					<h5>Choose a different login method.</h5>
				</div>
				<div>
					<button class="button">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
						</svg>
						Go back
					</button>
				</div>
			</div>
		</Details>
	</div>
</div>

<script>
	import Details from "../components/details.svelte"
</script>
