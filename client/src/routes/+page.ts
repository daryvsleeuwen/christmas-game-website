import axios from '../axios/index';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const response = await axios.get('game/rules')
	
	return {gameRules: response.data}
}