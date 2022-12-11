import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess({
		typescript: true,
		sourceMap: false,
		scss: {
			prependData: `@import 'src/assets/scss/style.scss';`
		},
	}),

	extensions: ['.svelte'],

	kit: {
		adapter: adapter(),
	}
};

export default config;