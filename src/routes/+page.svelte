<script lang="ts">
	import { fly } from 'svelte/transition';
	import { swipe } from 'svelte-gestures';

	import ProjectShowcase from '../lib/ProjectShowcase.svelte';
	import Roadmap from '../lib/Roadmap.svelte';
	import Team from '../lib/Team.svelte';
	import TechShowcase from '../lib/TechShowcase.svelte';
	import { onMount } from 'svelte';

	const NAV_ITEMS = ['HOW WE WORK', 'ABOUT US', 'SHOWCASE', 'CONTACT'];

	// Toggle for showing team/tech stack
	let showTeam = true;

	// Projects for the "Showcase" section
	const SHOWCASE = [
		{
			project: 'Cookmate',
			client: 'Apex Design',
			clientURL: '/',
			scope: 'Mobile App',
			description:
				'We designed an app to help users find and share video recipes based on the ingredients they have in their kitchen.',
			stack: 'Flutter, Dart, Django, Adobe XD',
			image: './showcase/cookmate-desktop-sample.jpeg',
			imageMobile: './showcase/cookmate-mobile-sample.jpeg',
			mobileAspect: 'aspect-[9/16]'
		},
		{
			project: 'Zylabs Xplorer',
			client: 'ZyBooks',
			clientURL: 'https://www.zybooks.com/',
			scope: 'Web Platform',
			description:
				"We built a web platform and API to help professors analyze student's performance on ZyLabs.",
			stack: 'Django, AWS, PostgreSQL, Typescript, TailwindCSS',
			image: './showcase/zybooks-desktop-sample.jpeg',
			imageMobile: './showcase/zybooks-tablet-sample.jpeg',
			mobileAspect: 'aspect-[5/4]'
		},
		{
			project: 'Cinewave',
			client: 'Apex Design',
			clientURL: '/',
			scope: 'Desktop Application',
			description:
				'We built a powerful AI driven application to help videographers turn their old footage into passive income.',
			stack: 'Electron, SvelteKit, Pytorch, Golang, AWS, PostgreSQL',
			image: './showcase/cinewave-desktop-sample.jpeg'
		},
		{
			project: 'Emaglet',
			client: 'Frank Vahid',
			clientURL: 'https://www.emaglet.com/',
			scope: 'Web Platform',
			description:
				'We built a web platform that allows users to easily create, share, and monetize newsletters using Google Docs.',
			stack: 'Flutter, Dart, Django, AWS, PostgreSQL',
			image: './showcase/emaglet-desktop-sample.jpeg',
			imageMobile: './showcase/emaglet-mobile-sample.jpeg',
			mobileAspect: 'aspect-[9/16]'
		},
		{
			project: 'Vision',
			client: 'Apex Design',
			clientURL: '/',
			scope: 'Crossplatform',
			description:
				'We built a real-time productivity app to help users stay focused on their goals and tasks on all of their devices.',
			stack: 'Flutter, Dart, Django, AWS, PostgreSQL',
			image: './showcase/vision-desktop-sample.jpeg',
			imageMobile: './showcase/vision-mobile-sample.jpeg',
			mobileAspect: 'aspect-[9/16]'
		},
		{
			project: 'Wealthawk',
			client: 'Wealthawk',
			clientURL: 'https://www.wealthawk.com/',
			scope: 'UI/UX Design',
			description:
				"We designed a sleek, modern, and sophisticated user experience for Wealthawk's web and mobile apps.",
			stack: 'Adobe XD',
			image: './showcase/wealthawk-desktop-sample.jpeg',
			imageMobile: './showcase/wealthawk-mobile-sample.jpeg',
			mobileAspect: 'aspect-[9/16]'
		},
		{
			project: 'Anacove',
			client: 'Anacove',
			clientURL: 'https://www.anacove.com/',
			scope: 'Web Platform',
			description:
				'We helped Anacove maintain and build upon their existing codebase to help them scale their business.',
			stack: 'Angular, Golang, MongoDB',
			image: './showcase/anacove-desktop-sample.jpeg',
			imageMobile: './showcase/anacove-tablet-sample.jpeg',
			mobileAspect: 'aspect-[5/4]'
		}
	];

	let showcaseIndex = 0;
	let prevShowcaseIndex = 0;

	const setShowcaseIndex = (index: number) => {
		timeSinceChange = Date.now();
		prevShowcaseIndex = showcaseIndex;
		showcaseIndex = index;
	};

	function handleSwipe(event: { detail: { direction: string } }) {
		if (event.detail.direction === 'left') {
			if (showcaseIndex < SHOWCASE.length - 1) {
				setShowcaseIndex(showcaseIndex + 1);
			} else {
				showcaseIndex = -1;
				setShowcaseIndex(0);
			}
		} else if (event.detail.direction === 'right') {
			if (showcaseIndex > 0) {
				setShowcaseIndex(showcaseIndex - 1);
			} else {
				showcaseIndex = SHOWCASE.length;
				setShowcaseIndex(SHOWCASE.length - 1);
			}
		}
	}

	// Timer to automatically cycle through projects
	let timeSinceChange: number;
	function startTimer() {
		timeSinceChange = Date.now();
		const delta = 8000 + timeSinceChange - Date.now();
		setTimeout(() => {
			if (Date.now() - timeSinceChange >= 8000) {
				if (showcaseIndex < SHOWCASE.length - 1) {
					setShowcaseIndex(showcaseIndex + 1);
				} else {
					setShowcaseIndex(0);
				}
			}
			startTimer();
		}, delta);
	}
	onMount(startTimer);

	// Handle form submission
	let name = '';
	let company = '';
	let email = '';
	let message = '';

	async function handleSubmit() {
		const response = await fetch('/api/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				company,
				email,
				message
			})
		});

		if (response.ok) {
			alert("Email sent successfully, we'll get back to you as soon as possible!");
		} else {
			alert('Failed to send email');
		}
	}

	let isOpen = false;
</script>

<!-- Preloads the images so that they don't blink in and out in mobile transitions -->
<!-- <svelte:head>
	{#each SHOWCASE as project}
		<link rel="preload" as="image" href={project.image} />
		<link rel="preload" as="image" href={project.imageMobile} />
	{/each}
</svelte:head> -->

<header class="max-w-[1500px] flex flex-row px-10 sm:px-14 md:px-16 lg:px-20 mx-auto mt-8 md:mt-16">
	<img src="./apex.svg" alt="Apex Design" class="w-10 sm:w-14 sm:mt-4 md:mt-2 z-10" />
	<nav class="hidden md:flex flex-row items-start text-sm ml-auto">
		{#each NAV_ITEMS as item, index}
			<a
				href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
				class:lg:ml-20={index > 0}
				class:md:ml-14={index > 0}
				class:ml-10={index > 0}
				class="group tracking-widest font-medium whitespace-nowrap flex flex-col">
				<p class="pb-2">{item}</p>
				<div class="w-0 group-hover:w-2/3 h-px bg-apex-moon ease-out duration-300" />
			</a>
		{/each}
	</nav>
	<div class="relative ml-auto flex md:hidden">
		<div class="relative py-3 sm:max-w-xl">
			<button
				class="text-apex-moon w-10 h-10 relative focus:outline-none"
				on:click={() => (isOpen = !isOpen)}>
				<span class="sr-only">Open main menu</span>
				<div class="block w-5 absolute left-1/2 top-2">
					<span
						aria-hidden="true"
						class="block absolute h-0.5 w-5 bg-apex-moon duration-300 ease-out rounded-sm"
						class:rotate-45={isOpen}
						class:-translate-y-[0.375rem]={!isOpen} />
					<span
						aria-hidden="true"
						class="block absolute h-0.5 w-5 bg-apex-moon duration-300 ease-out rounded-sm"
						class:opacity-0={isOpen}
						class:scale-x-0={isOpen} />
					<span
						aria-hidden="true"
						class="block absolute h-0.5 w-5 bg-apex-moon duration-300 ease-out rounded-sm"
						class:-rotate-45={isOpen}
						class:translate-y-[0.375rem]={!isOpen} />
				</div>
			</button>
		</div>
		{#if isOpen}
			<div transition:fly={{ y: -25, duration: 300 }} class="absolute right-[0] top-16 z-10">
				<div
					class="py-1 bg-apex-midnight"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu">
					{#each NAV_ITEMS as item}
						<a
							href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
							class="group tracking-widest font-medium whitespace-nowrap flex flex-col items-end">
							<p class="pb-2 text-sm">{item}</p>
							<div class="w-0 group-hover:w-2/3 h-px bg-apex-moon ease-out duration-300 mb-4" />
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</header>
<section
	id="home"
	class="max-w-[1500px] flex flex-col px-10 sm:px-14 md:px-16 lg:px-20 md:flex-row mx-auto pb-72 md:pb-40 lg:pb-60 relative">
	<div class="flex flex-col mr-8 lg:mr-16 w-full">
		<h1
			class="mt-32 text-[56px] sm:text-[80px] md:text-[52px] lg:text-[60px] xl:text-[80px] font-bold tracking-[0.3em] leading-[1.3]">
			APEX
			<br />
			DESIGN.
		</h1>
		<div class="my-14 w-1/2 h-[1.5px] bg-apex-moon bg-opacity-10" />
		<p
			class="text-lg sm:text-xl md:text-lg lg:text-xl leading-relaxed text-apex-moon text-opacity-80 tracking-wide">
			We'll take your startup ideas. Your creative endeavors. Your fresh innovation. And we'll help
			you build everything.
			<br />
			<br />
			Beautifully.
		</p>
	</div>
	<div class="relative md:ml-6 lg:ml-12 w-full">
		<img
			src="./images/tablet.webp"
			alt="Design"
			class="rounded-sm h-[22rem] sm:h-[20rem] md:h-[42rem] lg:h-[52rem] object-cover w-full absolute top-24 sm:top-28" />
	</div>
</section>

<div class="bg-apex-moon text-apex-midnight px-10 sm:px-14 md:px-16 lg:px-20">
	<section
		id="how-we-work"
		class="max-w-[1330px] pt-[14rem] md:pt-44 flex flex-col md:flex-row mx-auto">
		<div class="flex flex-col w-full">
			<h2 class="font-bold text-[40px] xl:text-5xl tracking-[0.1em] leading-[1.3em]">
				BUILD EVERYTHING.
				<br />
				BEAUTIFUL.
			</h2>
			<p class="text-[17px] lg:text-xl mt-12 leading-relaxed tracking-wide">
				Wherever you are in your process, Apex can help. Our team has years of experience helping
				clients develop ideas and bring them to reality.
				<br />
				<br />
				If your idea is fleshed out in your mind, then we can help put pen to paper and plan it all the
				way through. And once that's ready, our team of designers and developers can build it from start
				to finish.
			</p>
			<div class="hidden md:block relative">
				<img
					src="./images/product.webp"
					alt="Design"
					class="md:h-[40rem] lg:h-[42rem] object-cover absolute md:top-[6rem] w-full" />
			</div>
		</div>
		<Roadmap />
		<div class="md:hidden relative">
			<img
				src="./images/product.webp"
				alt="Design"
				class="-bottom-40 h-[20rem] object-cover absolute w-full rounded-sm" />
		</div>
	</section>
</div>
<section
	id="about-us"
	class="max-w-[1500px] pt-72 sm:pt-64 flex flex-col md/lg:flex-row-reverse mx-auto min-h-[76rem] px-10 sm:px-14 md:px-16 lg:px-20">
	<div class="md:ml-16 md/lg:-mr-8 xl:mt-20 flex flex-col w-full">
		<h2
			class="font-bold text-[36px] md:text-[44px] xl:text-5xl tracking-[0.1em] leading-[1.3] sm:mr-8 lg:mr-0">
			WITH A KILLER TEAM. AND SOME KILLER TOOLS.
		</h2>
		<p
			class="text-lg sm:text-xl mt-12 leading-relaxed tracking-wide text-apex-moon text-opacity-80 mr-8 lg:mr-0">
			We're a pretty cool team, who can build pretty cool stuff, using pretty cool tech.
			<br />
			<br />
			You can take our word for it.
		</p>
		<div class="mt-16 w-1/2 h-[1.5px] bg-apex-moon bg-opacity-10" />
		<button
			on:click={() => (showTeam = !showTeam)}
			class="mt-16 bg-apex-moon hover:bg-white px-6 py-3 rounded-sm text-apex-midnight font-semibold mr-auto text-sm">
			{#if showTeam}
				SEE OUR TECH STACK
			{:else}
				SEE THE TEAM
			{/if}
		</button>
	</div>
	{#if showTeam}
		<Team />
	{:else}
		<TechShowcase />
	{/if}
</section>
<div class="bg-apex-moon text-apex-midnight">
	<section
		id="showcase"
		class="max-w-[1500px] py-32 sm:py-40 flex flex-col items-center mx-auto px-10 sm:px-14 md/lg:px-24 lg:px-28 xl:px-36">
		<h2
			class="font-bold text-[36px] md:text-[44px] xl:text-5xl tracking-[0.1em] leading-[1.3] text-center">
			CHECK OUT SOME
			<br class="max-sm:hidden" />
			OF OUR WORK.
		</h2>
		<p class="text-lg sm:text-xl mt-12 leading-relaxed tracking-wide text-center w-4/5 md/lg:w-1/2">
			We've been around the block. From small startups to large enterprises, we've helped build
			products for all kinds of clients.
		</p>
		<div class="flex flex-row mt-20">
			{#each SHOWCASE as _, index}
				<button on:click={() => setShowcaseIndex(index)} class="px-2">
					<div
						class:bg-opacity-20={showcaseIndex !== index}
						class:hover:bg-opacity-40={showcaseIndex !== index}
						class="h-2 w-2 rounded-full bg-apex-midnight" />
				</button>
			{/each}
		</div>
		<div
			class="relative w-full h-[46rem] sm:h-[48rem]"
			on:swipe={handleSwipe}
			use:swipe={{ timeframe: 300, minSwipeDistance: 60, touchAction: 'pan-y' }}>
			{#each SHOWCASE as project, index}
				<ProjectShowcase {project} {showcaseIndex} {prevShowcaseIndex} {index} />
			{/each}
		</div>
	</section>
</div>
<section
	id="contact"
	class="max-w-[1500px] pt-36 lg:pt-56 mb-16 md:mb-32 flex flex-row lg:px-36 mx-auto">
	<div class="flex flex-col w-full">
		<h2 class="font-bold text-[38px] sm:text-5xl tracking-[0.1em] leading-[1.3] text-center mx-12">
			LET'S BUILD SOMETHING.
			<br class="max-sm:hidden" />
			BEAUTIFUL.
		</h2>
		<div class="mx-auto mt-20 w-1/4 h-[1.5px] bg-apex-moon bg-opacity-10" />
		<p
			class="text-lg sm:text-xl mt-12 leading-relaxed tracking-wide text-apex-moon text-opacity-80 text-center px-10 sm:px-0 w-full sm:w-1/2 mx-auto">
			If you want to learn more, or are ready to dive into your next venture, reach out to us by
			email at <a
				href="mailto:contact@apexdesign.io"
				class="text-orange-400 hover:text-orange-300 tracking-wider font-medium">
				contact@apexdesign.io.
			</a>
		</p>
		<form
			class="mt-16 space-y-6 px-10 sm:px-0 w-full sm:w-[73%] mx-auto"
			on:submit|preventDefault={handleSubmit}>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<div class="flex flex-row">
						<p class="text-[13px] mb-2 font-medium">YOUR NAME</p>
						<p class="text-[11px] ml-3 mt-px text-apex-moon text-opacity-20">REQUIRED</p>
					</div>
					<label for="name" class="sr-only">Name</label>
					<input
						id="name"
						name="name"
						type="text"
						autocomplete="given-name"
						required
						class="rounded-sm bg-apex-moon bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-10 p-3 w-full text-apex-moon placeholder:text-apex-moon placeholder:text-opacity-30 text-[14.5px] outline-none"
						placeholder="First and last name..."
						bind:value={name} />
				</div>
				<div>
					<p class="text-[13px] mb-2 font-medium">COMPANY</p>
					<label for="company" class="sr-only">Company</label>
					<input
						id="company"
						name="company"
						type="text"
						class="rounded-sm bg-apex-moon bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-10 p-3 w-full text-apex-moon placeholder:text-apex-moon placeholder:text-opacity-30 text-[14.5px] outline-none"
						placeholder="Company or organization name..."
						bind:value={company} />
				</div>
			</div>
			<div>
				<div class="flex flex-row">
					<p class="text-[13px] mb-2 font-medium">EMAIL</p>
					<p class="text-[11px] ml-3 mt-px text-apex-moon text-opacity-20">REQUIRED</p>
				</div>
				<label for="email" class="sr-only">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					class="rounded-sm bg-apex-moon bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-10 p-3 w-full text-apex-moon placeholder:text-apex-moon placeholder:text-opacity-30 text-[14.5px] outline-none"
					placeholder="example@email.com..."
					bind:value={email} />
			</div>
			<div>
				<div class="flex flex-row">
					<p class="text-[13px] mb-2 font-medium">INQUIRY</p>
					<p class="text-[11px] ml-3 mt-px text-apex-moon text-opacity-20">REQUIRED</p>
				</div>
				<label for="inquiry" class="sr-only">Inquiry</label>
				<textarea
					id="inquiry"
					name="inquiry"
					rows="8"
					required
					class="rounded-sm bg-apex-moon bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-10 p-3 w-full text-apex-moon placeholder:text-apex-moon placeholder:text-opacity-30 text-[14.5px] outline-none"
					placeholder="Hey! I was thinking..."
					bind:value={message} />
			</div>
			<div>
				<button
					type="submit"
					class="mt-10 text-sm flex justify-center py-2 px-4 text-apex-midnight font-semibold bg-apex-moon w-1/3 mx-auto hover:bg-white rounded-sm">
					SEND
				</button>
			</div>
		</form>
	</div>
</section>

<footer
	class="flex flex-row w-full border-t border-apex-moon border-opacity-5 items-center px-8 sm:px-12 py-6">
	<img src="./apex.svg" alt="Apex Design" class="w-4" />
	<a href="/" class="ml-4 tracking-widest font-medium">APEX DESIGN.</a>
	<div class="hidden lg:flex flex-row mx-auto text-[13px]">
		<a href="#how-we-work" class="mx-4 text-apex-moon text-opacity-60 hover:text-opacity-100">
			How We Work
		</a>
		<a href="#about-us" class="mx-4 text-apex-moon text-opacity-60 hover:text-opacity-100">
			About Us
		</a>
		<a href="#showcase" class="mx-4 text-apex-moon text-opacity-60 hover:text-opacity-100">
			Showcase
		</a>
	</div>
	<p class="ml-auto sm:ml-16 text-xs text-apex-moon text-opacity-40">© Apex Design LLC</p>
</footer>
