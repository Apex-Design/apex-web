<script lang="ts">
	import viewport from './viewport';

	// Profiles for the "About Us" section
	const PROFILES = [
		{
			name: 'Dayyan Sisson',
			role1: 'Frontend Developer',
			role2: 'UI/UX Design',
			image: './team/dayyan.jpg',
			link: 'https://www.linkedin.com/in/dayyan-sisson-a58479a7/'
		},
		{
			name: 'Gabriel Beal',
			role1: 'Full Stack Developer',
			role2: 'System Architecture',
			image: './team/gabriel.jpg',
			link: 'https://www.linkedin.com/in/gabe-beal/'
		},
		{
			name: 'Brian Rojas',
			role1: 'Backend Developer',
			role2: 'DevOps',
			image: './team/brian.jpg',
			link: 'https://www.linkedin.com/in/brianrojas95/'
		}
	];

	const inView = Array(PROFILES.length).fill(false);
</script>

<div class="mt-24 md/lg:mt-0 lg:mx-32 flex flex-col w-full pb-48 md/lg:items-start">
	{#each PROFILES as profile, index}
		<a
			use:viewport
			on:enterViewport={() => (inView[index] = true)}
			on:exitViewport={() => (inView[index] = false)}
			href={profile.link}
			target="_blank"
			class:xl:ml-28={index === 0}
			class:lg:ml-12={index === 0}
			class:lg:-ml-32={index === 1}
			class:sm:ml-auto={index !== 1}
			class:sm:mr-12={index !== 1}
			class:xl:ml-48={index === 2}
			class:xl:mt-6={index === 1}
			class:md:mb-14={index < 2}
			class:mb-20={index < 2}
			class:translate-x-10={!inView[index] && index !== 1}
			class:-translate-x-10={!inView[index] && index === 1}
			class:opacity-0={!inView[index]}
			class:md:delay-300={inView[index]}
			class="flex flex-row items-center group ease-out duration-300">
			<img
				src={profile.image}
				alt={profile.name}
				class="aspect-square sm:aspect-[4/3] md:aspect-square object-cover w-28 sm:w-56 md:w-48" />
			<div class="ml-4 sm:ml-8 flex flex-col text-lg">
				<h4 class="text-base font-medium tracking-widest mb-2">
					{profile.name.toUpperCase()}
				</h4>
				<div class="mb-4 w-1/3 h-px bg-apex-moon bg-opacity-10" />
				<p
					class="text-apex-moon text-opacity-40 text-sm tracking-wide leading-relaxed whitespace-nowrap">
					{profile.role1.toUpperCase()}
					<br />
					{profile.role2.toUpperCase()}
				</p>
				<p
					class="text-sm text-apex-moon -ml-6 group-hover:ml-0 duration-200 ease-out text-opacity-0 group-hover:text-opacity-60 mt-0 group-hover:mt-4">
					Visit Profile ⟶
				</p>
			</div>
		</a>
	{/each}
</div>
