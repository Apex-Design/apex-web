<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Project {
		project: string;
		client: string;
		clientURL: string;
		scope: string;
		description: string;
		stack: string;
		image: string;
		imageMobile?: string;
		mobileAspect?: string;
	}

	export let project: Project;
	export let index: number;
	export let showcaseIndex: number;
	export let prevShowcaseIndex: number;

	const reverse = () => {
		if (showcaseIndex < prevShowcaseIndex) return -1;
		return 1;
	};
</script>

{#if index === showcaseIndex}
	<div class="flex flex-col md/lg:flex-row pt-20 items-center">
		<div
			in:fly={{ x: 50 * reverse(), delay: 150 }}
			out:fly={{ x: -50 * reverse() }}
			class="flex flex-col w-[95%] md/lg:w-2/3"
		>
			<h4 class="text-apex-midnight text-opacity-25 font-bold tracking-widest mb-3">PROJECT</h4>
			<p class="text-2xl tracking-widest font-bold">
				{project.project.toUpperCase()}
			</p>
			<h4 class="text-apex-midnight text-opacity-25 font-bold tracking-widest mt-6 md/lg:mt-12 mb-3">
				CLIENT
			</h4>
			<a
				href={project.clientURL}
				target="_blank"
				class="text-2xl tracking-widest font-bold hover:text-orange-400 ease-out duration-100"
			>
				{project.client.toUpperCase()}
			</a>

			<h4 class="text-apex-midnight text-opacity-25 font-bold tracking-widest mt-6 md/lg:mt-12 mb-3">SCOPE</h4>
			<p class="text-2xl tracking-widest font-bold">
				{project.scope.toUpperCase()}
			</p>

			<h4 class="text-apex-midnight text-opacity-25 font-bold tracking-widest mt-6 md/lg:mt-12 mb-3">
				BREAKDOWN
			</h4>
			<p class="text-xl font-semibold">
				{project.description}
			</p>
			<p class="text-[15px] mt-12 md/lg:mt-20 text-apex-midnight text-opacity-40">
				{project.stack}
			</p>
		</div>
		<div class="mt-14 md/lg:mt-0 md/lg:ml-20 lg:ml-32 w-full relative">
			<img
				src={project.image}
				alt={project.project}
				class="object-cover object-left w-full aspect-square rounded-sm"
				in:fly={{ x: 150 * reverse(), delay: 150 }}
				out:fly={{ x: -150 * reverse() }}
			/>
			{#if project.imageMobile}
				<img
					in:fly={{ x: 200 * reverse(), duration: 450, delay: 150 }}
					out:fly={{ x: -200 * reverse(), duration: 450 }}
					src={project.imageMobile}
					alt={project.project}
					class:2xl:h-96={project.mobileAspect !== 'aspect-[9/16]'}
					class:lg:h-80={project.mobileAspect !== 'aspect-[9/16]'}
					class:min-[930px]:h-64={project.mobileAspect !== 'aspect-[9/16]'}
					class:md:h-96={project.mobileAspect !== 'aspect-[9/16]'}
					class:sm:h-80={project.mobileAspect !== 'aspect-[9/16]'}
					class:h-60={project.mobileAspect !== 'aspect-[9/16]'}
					class:sm:block={project.mobileAspect !== 'aspect-[9/16]'}
					class:hidden={project.mobileAspect !== 'aspect-[9/16]'}
					class:bottom-12={project.mobileAspect !== 'aspect-[9/16]'}
					class:xl:w-64={project.mobileAspect === 'aspect-[9/16]'}
					class:lg:w-52={project.mobileAspect === 'aspect-[9/16]'}
					class:min-[930px]:max-lg:w-44={project.mobileAspect === 'aspect-[9/16]'}
					class:sm:w-56={project.mobileAspect === 'aspect-[9/16]'}
					class:w-36={project.mobileAspect === 'aspect-[9/16]'}
					class:bottom-6={project.mobileAspect === 'aspect-[9/16]'}
					class="{project.mobileAspect} object-cover object-left-top absolute bottom-0 -right-3 md/lg:-right-12 drop-shadow-lg rounded-lg"
				/>
			{/if}
		</div>
	</div>
{/if}
