<div class="transparent-900 landing m-auto mt-40 mb-60 w-3/5 rounded-2xl p-10 text-center">
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

				<button class="button" on:click={requirePassword}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span data-loc>Continue</span>
				</button>
			</div>
			<div class="transparent-800 my-5 flex w-1/2 flex-wrap items-center justify-center rounded-2xl p-5 sm:w-full">
				<h4 data-loc class="mb-3">No password</h4>
				<h5 data-loc class="mb-3">If you don't want to type in your password every time you launch Authme.</h5>

				<button class="button" on:click={noPassword}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span data-loc>Confirm</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div class="transparent-900 requirePassword m-auto mt-40 mb-60 hidden w-3/5 rounded-2xl p-10 text-center">
	<h1>Require password</h1>

	<div class="mx-auto flex w-4/5 flex-col items-center justify-center rounded-2xl p-10">
		<div class="transparent-800 mb-10 w-full rounded-2xl p-5">
			<h2>Create password</h2>
			<h3>Create a strong password to encrypt your codes.</h3>
		</div>

		<div class="transparent-800 mb-10 w-full rounded-2xl p-5">
			<div class="mx-auto flex w-full items-center justify-center gap-5 text-left sm:flex-wrap">
				<div>
					<h5>Password</h5>
					<div class="flex items-center justify-center">
						<input class="input passwordInput0 mt-1" type="password" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							on:click={() => {
								showPassword(0)
							}}
							class="showPassword0 relative right-9 h-6 w-6 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							on:click={() => {
								showPassword(0)
							}}
							class="hidePassword0 relative right-9 hidden h-6 w-6 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
						</svg>
					</div>
				</div>

				<div>
					<h5>Confirm password</h5>
					<div class="flex items-center justify-center">
						<input class="input passwordInput1 mt-1" type="password" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							on:click={() => {
								showPassword(1)
							}}
							class="showPassword1 relative right-9 h-6 w-6 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							on:click={() => {
								showPassword(1)
							}}
							class="hidePassword1 relative right-9 hidden h-6 w-6 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
						</svg>
					</div>
				</div>
			</div>

			<button class="button mx-auto mt-10" on:click={createPassword}>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				Confirm
			</button>
		</div>

		<Details>
			<div class="flex justify-between">
				<div>
					<h4>Choose a different method</h4>
					<h5>Go back to the previous page and choose a different login method.</h5>
				</div>
				<div class="ml-20">
					<button
						class="smallButton"
						on:click={() => {
							location.reload()
						}}
					>
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

<script lang="ts">
	import { appController, createPassword, noPassword, requirePassword, showPassword } from "./index"
	import Details from "../../components/details.svelte"
	import { onMount } from "svelte"

	onMount(() => {
		appController()
	})
</script>
