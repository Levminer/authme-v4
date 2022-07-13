<svelte:head>
	<title>hi</title>
</svelte:head>

<div class="flex h-screen">
	<Navigation />

	<div class="w-full overflow-hidden overflow-y-scroll">
		<div class="top" />

		<Route path="/"><Landing /></Route>
		<Route path="/confirm"><Confirm /></Route>

		<Route path="/codes"><Codes /></Route>
		<Route path="/import"><Import /></Route>
		<Route path="/export"><Export /></Route>
		<Route path="/edit"><Edit /></Route>
		<Route path="/settings"><Settings /></Route>
	</div>
</div>

<script lang="ts">
	import { Route, router } from "tinro"
	import { onMount } from "svelte"

	import UpdateAlert from "../components/updateAlert.svelte"

	import Landing from "../windows/landing.svelte"
	import Codes from "../windows/codes/codes.svelte"
	import Settings from "../windows/settings.svelte"
	import Import from "../windows/import.svelte"
	import Export from "../windows/export.svelte"
	import Confirm from "../windows/confirm.svelte"
	import Navigation from "../components/navigation.svelte"
	import Edit from "../windows/edit.svelte"

	onMount(() => {
		router.subscribe(() => {
			document.querySelector(".top").scrollIntoView()
		})
	})
</script>
