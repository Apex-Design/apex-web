/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				apex: {
					midnight: '#0F0F0F',
					moon: '#E4E4E4'
				}
			},
			fontFamily: {
				sans: ['proxima-nova', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
};
