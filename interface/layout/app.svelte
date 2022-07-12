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
			<Route path="/import" component={Import} />
			<Route path="/export" component={Export} />
			<Route path="/edit" component={Edit} />
			<Route path="/confirm" component={Confirm} />
		</div>
	</div>
</Router>

<script lang="ts">
	import { Router, Route } from "svelte-routing"

	import UpdateAlert from "../components/updateAlert.svelte"

	import Landing from "../windows/landing.svelte"
	import Codes from "../windows/codes/codes.svelte"
	import Settings from "../windows/settings.svelte"
	import Import from "../windows/import.svelte"
	import Export from "../windows/export.svelte"
	import Confirm from "../windows/confirm.svelte"
	import Navigation from "../components/navigation.svelte"
	import Edit from "../windows/edit.svelte"
</script>
