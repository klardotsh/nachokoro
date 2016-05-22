import uuid from 'node-uuid';

import { ESTABLISHMENTS, LANDMARKS } from './cards/base';

const generateId = uuid.v4;

export function addPlayerToGame(game, player) {
	if (game.players.length === game.maxPlayers) {
		throw new Error('Game is full');
	}

	return {
		...game,
		players: [
			...game.players,
			player,
		],
	};
}

export function createGame(name = 'Unnamed Game') {
	const establishments = [];

	ESTABLISHMENTS.forEach((es) => {
		Array.apply(null, Array(es.count)).forEach(() => {
			establishments.push({
				...es,
				id: generateId(),
				count: undefined,
			});
		});
	});

	return {
		name,
		establishments,
		id: generateId(),
		bank: Infinity,
		players: [],
		maxPlayers: 4,
	};
}

export function createPlayer(name = 'Unnamed Player') {
	return {
		name,
		id: generateId(),
		coin: 0,
		extraTurnWhen: [],
		rollsAllowedPerTurn: 1,

		establishments: ESTABLISHMENTS
			.filter((es) => es.spawn)
			.map((es) => Object.assign({}, es, {
				id: generateId(),
			})),

		landmarks: LANDMARKS.map((lm) => Object.assign({}, lm, {
			id: generateId(),
			purchased: false,
		})),
	};
}

export const defaultGameState = {
	bank: Infinity,
	players: [],
	market: [],
};

export default function app() {
}

