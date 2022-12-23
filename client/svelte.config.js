import adapter from '@sveltejs/adapter-node';
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
		adapter: adapter({ out: 'build' }),
	}
};

export default config;