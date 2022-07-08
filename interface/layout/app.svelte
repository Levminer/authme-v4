<svelte:head>
	<title>hi</title>
</svelte:head>

<Router>
	<div class="flex h-screen">
		<Navigation />

		<div class="w-full overflow-hidden overflow-y-scroll">
			<Route path="/" component={Landing} />
			<Route path="/settings" component={Settings} />
			<Route path="/codes" component={Codes} />
		</div>
	</div>
</Router>

<script lang="ts">
	import { Router, Route } from "svelte-navigator"

	import Landing from "../windows/landing.svelte"
	import Codes from "../windows/codes.svelte"
	import Settings from "../windows/settings.svelte"
	import Navigation from "../components/navigation.svelte"
</script>
