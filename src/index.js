import assert from 'assert';
import uuid from 'node-uuid';

import * as baseGame from './cards/base';

assert(baseGame.landmarks && baseGame.establishments);

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

	// this is absolutely incapable of handling the
	// market scheme introduced in the harbor exp.
	//
	// oh 🐳
	baseGame.establishments.forEach((es) => {
		for (let i = 0; i < es.count; i++) {
			establishments.push({
				...es,
				id: generateId(),
				count: undefined,
			});
		}
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

		establishments: baseGame.establishments
			.filter((es) => es.spawn)
			.map((es) => ({
				...es,
				id: generateId(),
			})),

		landmarks: baseGame.landmarks.map((lm) => ({
			...lm,
			id: generateId(),
			purchased: false,
		})),
	};
}

export default function app() {
}

