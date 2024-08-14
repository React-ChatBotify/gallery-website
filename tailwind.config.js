/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "dark",
	theme: {
		container: {
			center: true,
		},
		extend: {
			keyframes: {
				spin: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				scaleUp: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.5)' },
				},
				'spin-x': {
					'0%': { transform: 'rotateX(0deg)' },
					'100%': { transform: 'rotateX(360deg)' },
				},
				'spin-y': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' },
				},
			},
			animation: {
				spin: 'spin 2s linear infinite',
				scaleUp1: 'scaleUp 2s ease-in-out infinite',
				scaleUp2: 'scaleUp 2s ease-in-out infinite 0.5s',
				scaleUp3: 'scaleUp 2s ease-in-out infinite 1s',
				'spin-1': 'spin 12s infinite linear',
				'spin-2': 'spin 6s infinite linear',
				'spin-3': 'spin 4s infinite linear',
				'spin-4': 'spin 3s infinite linear',
				'spin-5': 'spin 2.4s infinite linear',
				'spin-6': 'spin 2s infinite linear',
				'spin-7': 'spin 1.714285714285714s infinite linear',
				'spin-8': 'spin 1.5s infinite linear',
				'spin-9': 'spin 1.333333333333333s infinite linear',
				'spin-10': 'spin 1.2s infinite linear',
				'spin-11': 'spin 1.090909090909091s infinite linear',
				'spin-12': 'spin 1s infinite linear',
				'spin-13': 'spin 0.923076923076923s infinite linear',
				'spin-14': 'spin 0.857142857142857s infinite linear',
				'spin-15': 'spin 0.8s infinite linear',
				'spin-16': 'spin 0.75s infinite linear',
				'spin-x-slow': 'spin-x 12s linear infinite',
				'spin-y-medium': 'spin-y 6s linear infinite',
				'spin-x-fast': 'spin-x 4s linear infinite',
				'spin-y-faster': 'spin-y 2s linear infinite',
				'spin-x-slower': 'spin-x 15s linear infinite',
				'spin-y-slow': 'spin-y 8s linear infinite',
			},
		},
		scale: {
			'.5': '0.5',
		},
		colors: {
			'brand-purple': '#491d8d',
			'brand-blue': '#42afc5',
			'black': '#000000',
			'white': '#ffffff',
			'slate-400': '#94a3b8',
			'slate-500': '#64748b'
		},
		backgroundImage: {
			'brand-gradient-primary': 'linear-gradient(to right, rgb(73, 29, 141), rgb(66, 176, 197))',
			'brand-gradient-secondary': 'linear-gradient(to right, rgb(73, 29, 141), rgb(102, 136, 207))',
			'brand-gradient-white-purple': 'linear-gradient(to right, #ffffff, #491d8d)',
			'brand-gradient-white-blue': 'linear-gradient(to right, #ffffff, #42afc5)',
		},
	},
	plugins: [],
};