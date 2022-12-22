import axios from '../axios/index';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const rules = await axios.get('game/rules')	
	return {gameRules: rules.data.gameRules, diceInstructions: rules.data.diceInstructions}
}