<script lang="ts">
	import ProjectShowcase from '../lib/ProjectShowcase.svelte';

	const NAV_ITEMS = ['HOW WE WORK', 'ABOUT US', 'SHOWCASE', 'CONTACT'];

	// Descriptions for the "How We Work" section
	const HWW_DETAILS = [
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
		prevShowcaseIndex = showcaseIndex;
		showcaseIndex = index;
	};

	// Handle form submission
	let firstName = '';
	let lastName = '';
	let email = '';
	let message = '';

	async function handleSubmit() {
		const response = await fetch('/api/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName,
				lastName,
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
</script>

<section id="home" class="flex flex-row mt-16 w-[80rem] mx-auto h-[56rem]">
	<div class="flex flex-col mr-16">
		<img src="./apex.svg" alt="Apex Design" class="w-14 mt-4" />
		<h1 class="mt-32 text-[80px] font-bold tracking-[0.3em] leading-[1.3]">
			APEX
			<br />
			DESIGN.
		</h1>
		<div class="my-14 w-1/2 h-[1.5px] bg-apex-moon bg-opacity-10" />
		<p class="text-xl leading-relaxed text-apex-moon text-opacity-80 tracking-wide">
			We'll take your startup ideas. Your fresh creative endeavors. Your new innovation. And we'll
			help you build everything.
			<br />
			<br />
			Beautifully.
		</p>
	</div>
	<div class="flex flex-col relative ml-16">
		<nav class="flex flex-row items-center text-sm">
			{#each NAV_ITEMS as item, index}
				<a
					href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
					class:ml-20={index > 0}
					class="group tracking-widest font-medium whitespace-nowrap flex flex-col"
				>
					<p class="pb-2">{item}</p>
					<div class="w-0 group-hover:w-2/3 h-px bg-apex-moon ease-out duration-300" />
				</a>
			{/each}
		</nav>
		<img
			src="./images/tablet.webp"
			alt="Design"
			class="h-[56rem] object-cover absolute top-28 w-full"
		/>
	</div>
</section>
<div class="bg-apex-moon text-apex-midnight">
	<section id="how-we-work" class="pt-44 flex flex-row w-[80rem] mx-auto">
		<div class="flex flex-col w-full relative">
			<h2 class="font-bold text-5xl tracking-[0.1em] leading-[1.3]">
				BUILD EVERYTHING.
				<br />
				BEAUTIFUL.
			</h2>
			<p class="text-xl mt-12 leading-relaxed tracking-wide">
				Wherever you are in your process, Apex can help. Our team has years of experience helping
				startups develop ideas and bring them to reality.
				<br />
				<br />
				If your idea is fleshed out in your mind, then we can help put pen to paper and plan it all the
				way through. And once that's ready, our team of designers and developers can build it from start
				to finish.
			</p>
			<img
				src="./images/product.webp"
				alt="Design"
				class="h-[40rem] object-cover absolute top-[28rem] w-full"
			/>
		</div>
		<div class="mt-32 ml-32 flex flex-col w-2/3 pb-48">
			{#each HWW_DETAILS as details, index}
				<h3 class="font-bold text-3xl tracking-[0.1em] leading-[1.3]">
					<span class="text-apex-midnight text-opacity-25 font-semibold">{index + 1}.</span>
					{details.title.toUpperCase()}
				</h3>
				<p class="text-apex-midnight text-opacity-40 text-lg mt-4 leading-relaxed tracking-wide">
					{details.description}
				</p>
				{#if index < HWW_DETAILS.length - 1}
					<div class="mt-12 mb-16 w-2/3 h-px bg-apex-midnight bg-opacity-10" />
				{/if}
			{/each}
		</div>
	</section>
</div>
<section id="about-us" class="pt-64 flex flex-row w-[80rem] mx-auto">
	<div class="mx-32 flex flex-col w-full pb-48">
		{#each PROFILES as profile, index}
			<a
				href={profile.link}
				target="_blank"
				class:ml-28={index === 0}
				class:-ml-32={index === 1}
				class:ml-48={index === 2}
				class:mt-6={index === 1}
				class:mb-14={index < 2}
				class="flex flex-row items-center group"
			>
				<img src={profile.image} alt={profile.name} class="aspect-square object-cover w-48" />
				<div class="ml-8 flex flex-col text-lg">
					<h4 class="text-base font-medium tracking-widest mb-2">
						{profile.name.toUpperCase()}
					</h4>
					<div class="mb-4 w-1/3 h-px bg-apex-moon bg-opacity-10" />
					<p
						class="text-apex-moon text-opacity-40 text-sm tracking-wide leading-relaxed whitespace-nowrap"
					>
						{profile.role1.toUpperCase()}
						<br />
						{profile.role2.toUpperCase()}
					</p>
					<p
						class="text-sm text-apex-moon -ml-6 group-hover:ml-0 duration-200 ease-out text-opacity-0 group-hover:text-opacity-60 mt-0 group-hover:mt-4"
					>
						Visit Profile ⟶
					</p>
				</div>
			</a>
		{/each}
	</div>
	<div class="ml-12 mt-20 flex flex-col w-full relative">
		<h2 class="font-bold text-5xl tracking-[0.1em] leading-[1.3]">
			WITH A KILLER TEAM. AND SOME KILLER TOOLS.
		</h2>
		<p class="text-xl mt-12 leading-relaxed tracking-wide text-apex-moon text-opacity-80">
			We're a pretty cool team, who can build pretty cool stuff, using pretty cool tech.
			<br />
			<br />
			You can take our word for it.
		</p>
		<div class="mt-20 w-1/2 h-[1.5px] bg-apex-moon bg-opacity-10" />
	</div>
</section>
<div class="bg-apex-moon text-apex-midnight">
	<section id="showcase" class="pt-40 flex flex-col items-center w-[80rem] mx-auto">
		<h2 class="font-bold text-5xl tracking-[0.1em] leading-[1.3] text-center">
			CHECK OUT SOME
			<br />
			OF OUR WORK.
		</h2>
		<p class="text-xl mt-12 leading-relaxed tracking-wide text-center w-1/2">
			We've been around the block. From small startups to large enterprises, we've helped build
			products for all kinds of clients.
		</p>
		<div class="flex flex-row mt-20">
			{#each SHOWCASE as _, index}
				<button
					on:click={() => setShowcaseIndex(index)}
					class:bg-opacity-20={showcaseIndex !== index}
					class:hover:bg-opacity-40={showcaseIndex !== index}
					class="h-2 w-2 mx-2 rounded-full bg-apex-midnight"
				/>
			{/each}
		</div>
		<div class="relative h-[56rem] w-full">
			{#each SHOWCASE as project, index}
				<ProjectShowcase {project} {showcaseIndex} {prevShowcaseIndex} {index} />
			{/each}
		</div>
	</section>
</div>
<section id="about-us" class="pt-56 flex flex-row w-[60rem] mx-auto">
	<div class="flex flex-col w-full mb-64">
		<h2 class="font-bold text-5xl tracking-[0.1em] leading-[1.3] text-center">
			LET'S BUILD SOMETHING.
			<br />
			BEAUTIFUL.
		</h2>
		<div class="mx-auto mt-20 w-1/4 h-[1.5px] bg-apex-moon bg-opacity-10" />
		<p
			class="text-xl mt-12 leading-relaxed tracking-wide text-apex-moon text-opacity-80 text-center w-1/2 mx-auto"
		>
			If you want to learn more, or are ready to dive into your next venture, reach out to us by
			email at <a
				href="contact@apexdesign.io"
				class="text-orange-400 hover:text-orange-300 tracking-wider font-semibold"
			>
				contact@apexdesign.io.
			</a>
		</p>
		<form class="mt-16 space-y-6 w-[73%] mx-auto" on:submit|preventDefault={handleSubmit}>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<p class="text-[13px] mb-1.5 font-medium">YOUR NAME</p>
					<label for="first-name" class="sr-only">First Name</label>
					<input
						id="first-name"
						name="first-name"
						type="text"
						autocomplete="given-name"
						required
						class="rounded-sm bg-apex-moon bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-10 p-3 w-full text-apex-moon placeholder:text-apex-moon placeholder:text-opacity-30 text-[14.5px] outline-none"
						placeholder="First and last name..."
						bind:value={firstName}
					/>
				</div>
				<div>
					<p class="text-[13px] mb-1.5 font-medium">COMPANY</p>
					<label for="last-name" class="sr-only">Last Name</label>
					<input
						id="last-name"
						name="last-name"
						type="text"
						autocomplete="family-name"
						required
						class="rounded-sm bg-apex-moon bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-10 p-3 w-full text-apex-moon placeholder:text-apex-moon placeholder:text-opacity-30 text-[14.5px] outline-none"
						placeholder="Company or organization name..."
						bind:value={lastName}
					/>
				</div>
			</div>
			<div>
				<p class="text-[13px] mb-1.5 font-medium">EMAIL</p>
				<label for="email" class="sr-only">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					class="rounded-sm bg-apex-moon bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-10 p-3 w-full text-apex-moon placeholder:text-apex-moon placeholder:text-opacity-30 text-[14.5px] outline-none"
					placeholder="example@email.com..."
					bind:value={email}
				/>
			</div>
			<div>
				<p class="text-[13px] mb-1.5 font-medium">INQUIRY</p>
				<label for="inquiry" class="sr-only">Inquiry</label>
				<textarea
					id="inquiry"
					name="inquiry"
					rows="4"
					required
					class="rounded-sm bg-apex-moon bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-10 p-3 w-full text-apex-moon placeholder:text-apex-moon placeholder:text-opacity-30 text-[14.5px] outline-none"
					placeholder="Hey! I was thinking..."
					bind:value={message}
				/>
			</div>
			<div>
				<button
					type="submit"
					class="mt-10 text-sm flex justify-center py-2 px-4 text-apex-midnight font-bold bg-apex-moon w-1/3 mx-auto hover:-translate-y-1 ease-out duration-200"
				>
					SEND
				</button>
			</div>
		</form>
	</div>
</section>
<footer
	class="flex flex-row w-full border-t border-apex-moon border-opacity-5 items-center px-12 py-6"
>
	<img src="./apex.svg" alt="Apex Design" class="w-4" />
	<a href="/" class="ml-4 tracking-widest font-medium">APEX DESIGN.</a>
	<div class="flex flex-row mx-auto text-[13px]">
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
	<p class="ml-16 text-xs text-apex-moon text-opacity-40">© Apex Design LLC</p>
</footer>
