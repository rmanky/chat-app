<script>
	import 'virtual:windi.css';
</script>

<div
	gradient="to-r from-green-300 via-blue-600 to-purple-600"
	p="16"
	h="full"
	display="flex"
	flex="col"
	justify="center"
	align="items-center"
>
	<div
		w="400px"
		h="800px"
        text="light-300"
		bg="dark-600"
		border="rounded-lg"
		shadow="lg"
		display="flex"
		flex="col"
		overflow="hidden"
	>
		<slot />
	</div>
</div>

<style>
	:global(html),
	:global(body),
	:global(#svelte) {
		margin: none;
		padding: none;
		height: 100%;
	}
</style>
