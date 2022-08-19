{#key $router.path}
	<div in:fade={{ duration: 200 }}>
		<slot />
	</div>
{/key}

<script>
	import { router } from "tinro"
	import { fade, fly } from "svelte/transition"
</script>
