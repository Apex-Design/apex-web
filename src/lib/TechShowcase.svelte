<script lang="ts">
	import viewport from './viewport';

	const STACK = [
		{ name: 'Angular', path: 'angular', size: 'w-16' },
		{ name: 'Svelte', path: 'svelte', size: 'w-14 ml-2' },
		{ name: 'Dart', path: 'dart', size: 'w-12 ml-1' },
		{ name: 'Tailwind CSS', path: 'tailwind', size: 'w-16' },
		{ name: 'Docker', path: 'docker', size: 'w-14 ml-2' },
		{ name: 'Flutter', path: 'flutter', size: 'w-16' },
		{ name: 'AWS', path: 'aws', size: 'w-16' },
		{ name: 'Go', path: 'go', size: 'w-[5rem] -ml-3' },
		{ name: 'Node.js', path: 'node', size: 'w-20 -ml-1' },
		{ name: 'Python', path: 'python', size: 'w-14 ml-1' },
		{ name: 'Django', path: 'django', size: 'w-20 -ml-1 -mb-2' },
		{ name: 'TypeScript', path: 'typescript', size: 'w-14' },
		{ name: 'PostgreSQL', path: 'postgresql', size: 'w-14' },
		{ name: 'Electron', path: 'electron', size: 'w-14 ml-2' },
		{ name: 'Adobe XD', path: 'xd', size: 'w-14 ml-1' }
	];

	const inView = Array(STACK.length).fill(false);
</script>

<div class="mx-32 grid grid-cols-3 gap-20 items-center justify-center w-full pb-48">
	{#each STACK as tech, index}
		<div
			use:viewport
			on:enterViewport={() => (inView[index] = true)}
			on:exitViewport={() => (inView[index] = false)}
			style="mask: url(./stack/{tech.path}.svg); -webkit-mask: url(./stack/{tech.path}.svg); transition-duration: {500 +
				Math.floor(index / 3) * 100}ms;"
			class:translate-y-10={!inView[index]}
			class:opacity-0={!inView[index]}
			class:delay-300={inView[index]}
			class="{tech.size} aspect-square bg-apex-moon ease-out" />
	{/each}
</div>
