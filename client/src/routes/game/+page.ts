import axios from '../../axios/index';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const rules = await axios.get('game/rules')
	// const hasAlreadyPlayed = await axios.get('game/already-played')
	const hasAlreadyPlayed = true

	return {gameRules: rules.data.gameRules, diceInstructions: rules.data.diceInstructions, hasAlreadyPlayed: true}
}