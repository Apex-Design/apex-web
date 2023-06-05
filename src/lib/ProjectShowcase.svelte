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
	<div
		class="flex flex-col lg:flex-row -mt-8 sm:mt-16 lg:max-2xl:mt-0 items-center absolute top-0 center-me">
		<div
			in:fly={{ x: 50 * reverse(), delay: 150 }}
			out:fly={{ x: -50 * reverse() }}
			class="hidden sm:flex flex-row lg:flex-col w-[95%] lg:w-2/3 text-left">
			<div class="flex flex-col w-1/2 lg:w-full lg:mt-0 mr-8 lg:mr-0">
				<h4 class="text-apex-midnight text-opacity-25 font-bold tracking-widest mb-3">PROJECT</h4>
				<p class="text-xl md:text-2xl tracking-widest font-bold">
					{project.project.toUpperCase()}
				</p>
				<h4 class="text-apex-midnight text-opacity-25 font-bold tracking-widest mt-6 lg:mt-12 mb-3">
					CLIENT
				</h4>
				<a
					href={project.clientURL}
					target="_blank"
					class="text-xl md:text-2xl tracking-widest font-bold hover:text-orange-400 ease-out duration-100">
					{project.client.toUpperCase()}
				</a>

				<h4 class="text-apex-midnight text-opacity-25 font-bold tracking-widest mt-6 lg:mt-12 mb-3">
					SCOPE
				</h4>
				<p class="text-xl md:text-2xl tracking-widest font-bold">
					{project.scope.toUpperCase()}
				</p>
			</div>
			<div class="flex flex-col w-1/2 lg:w-full -mt-1 lg:mt-0 ml-8 lg:ml-0">
				<h4 class="text-apex-midnight text-opacity-25 font-bold tracking-widest lg:mt-12 mb-3">
					BREAKDOWN
				</h4>
				<p class="text-xl font-semibold max-w-[32rem]">
					{project.description}
				</p>
				<p class="text-[15px] mt-12 lg:mt-20 text-apex-midnight text-opacity-40">
					{project.stack}
				</p>
			</div>
		</div>
		<div class="mt-14 lg:mt-0 lg:ml-20 w-full relative max-w-[48rem]">
			<img
				src={project.image}
				alt={project.project}
				class="object-cover object-left w-full aspect-square min-[500px]:aspect-[4/3] sm:aspect-video lg:aspect-square rounded-sm"
				in:fly={{ x: 150 * reverse(), delay: 150 }}
				out:fly={{ x: -150 * reverse() }} />
			{#if project.imageMobile}
				<img
					in:fly={{ x: 200 * reverse(), duration: 450, delay: 150 }}
					out:fly={{ x: -200 * reverse(), duration: 450 }}
					src={project.imageMobile}
					alt={project.project}
					class:2xl:h-96={project.mobileAspect !== 'aspect-[9/16]'}
					class:lg:h-80={project.mobileAspect !== 'aspect-[9/16]'}
					class:md:h-96={project.mobileAspect !== 'aspect-[9/16]'}
					class:sm:h-80={project.mobileAspect !== 'aspect-[9/16]'}
					class:h-48={project.mobileAspect !== 'aspect-[9/16]'}
					class:sm:-bottom-8={project.mobileAspect !== 'aspect-[9/16]'}
					class:bottom-8={project.mobileAspect !== 'aspect-[9/16]'}
					class:xl:w-64={project.mobileAspect === 'aspect-[9/16]'}
					class:lg:w-52={project.mobileAspect === 'aspect-[9/16]'}
					class:sm:w-40={project.mobileAspect === 'aspect-[9/16]'}
					class:w-36={project.mobileAspect === 'aspect-[9/16]'}
					class:bottom-6={project.mobileAspect === 'aspect-[9/16]'}
					class="{project.mobileAspect} object-cover object-left-top absolute -right-3 md/lg:-right-12 drop-shadow-md rounded-md" />
			{/if}
		</div>
		<div
			in:fly={{ x: 50 * reverse(), delay: 150 }}
			out:fly={{ x: -50 * reverse() }}
			class="sm:hidden text-left w-full mx-2 h-[16rem]">
			<div class="flex flex-row">
				<div class="flex flex-col">
					<h4
						class="text-sm mt-12 text-apex-midnight text-opacity-25 font-bold tracking-widest mb-1">
						PROJECT
					</h4>
					<p class="md:text-2xl tracking-widest font-bold">
						{project.project.toUpperCase()}
					</p>
				</div>
				<div class="ml-auto flex flex-col">
					<h4
						class="text-sm mt-12 text-apex-midnight text-opacity-25 font-bold tracking-widest mb-1">
						CLIENT
					</h4>
					<p class="md:text-2xl tracking-widest font-bold">
						{project.client.toUpperCase()}
					</p>
				</div>
			</div>
			<h4 class="text-sm mt-12 text-apex-midnight text-opacity-25 font-bold tracking-widest mb-1">
				BREAKDOWN
			</h4>
			<p class="text-xl font-semibold max-w-[32rem]">
				{project.description}
			</p>
			<p class="text-[15px] mt-12 lg:mt-20 text-apex-midnight text-opacity-40">
				{project.stack}
			</p>
		</div>
	</div>
{/if}

<style>
	.center-me {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
	}
</style>
