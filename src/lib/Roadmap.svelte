<script lang="ts">
	import viewport from './viewport';

	// Descriptions for the "How We Work" section
	const STEPS = [
		{
			title: 'IMAGINE',
			description: 'Turn that raw creativity into buildable ideas.'
		},
		{
			title: 'PLAN',
			description: 'Create beautiful designs and architect the solution.'
		},
		{
			title: 'DEVELOP',
			description: 'Iterative development with a focus on quality.'
		},
		{
			title: 'LAUNCH',
			description: 'Deploy your product everywhere your customers are.'
		}
	];

	const inView = Array(STEPS.length).fill(false);
</script>

<div class="mt-32 md:ml-32 flex flex-col w-full md:w-2/3 pb-48">
	{#each STEPS as details, index}
		<div
			use:viewport
			on:enterViewport={() => (inView[index] = true)}
			on:exitViewport={() => (inView[index] = false)}
			class:translate-x-20={!inView[index]}
			class:opacity-0={!inView[index]}
			class:delay-300={inView[index]}
			class="ease-out duration-300">
			<h3 class="font-bold text-3xl tracking-[0.1em] leading-[1.3]">
				<span class="text-apex-midnight text-opacity-25 font-semibold">{index + 1}.</span>
				{details.title.toUpperCase()}
			</h3>
			<p class="text-apex-midnight text-opacity-40 text-lg mt-4 leading-relaxed tracking-wide">
				{details.description}
			</p>
			{#if index < STEPS.length - 1}
				<div class="mt-12 mb-16 w-2/3 h-px bg-apex-midnight bg-opacity-10" />
			{/if}
		</div>
	{/each}
</div>
