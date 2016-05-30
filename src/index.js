import assert from 'assert';
import uuid from 'node-uuid';

import * as baseGame from './cards/base';

assert(baseGame.landmarks && baseGame.establishments);

const generateId = uuid.v4;

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
		money: 0,
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

export function findPlayer(game, playerId) {
	const players = game.players.filter(p => p.id === playerId);

	if (!players.length) {
		return null;
	}

	return players[0];
}

export function setMoney(game, playerId, money) {
	const player = findPlayer(game, playerId);

	if (!player) {
		throw new Error('Player not in game');
	}

	return {
		...game,
		players: [
			...game.players.filter(p => p.id !== playerId),
			{
				...player,
				money,
			},
		],
	};
}

export function findMarketEstablishment(game, establishmentId) {
	const establishments = game.establishments.filter(e => e.id === establishmentId);

	if (!establishments.length) {
		return null;
	}

	return establishments[0];
}

export function purchaseEstablishment(game, { playerId, establishmentId }) {
	const player = findPlayer(game, playerId);
	const establishment = findMarketEstablishment(game, establishmentId);

	if (!player) {
		throw new Error('Player not in game');
	}

	if (!establishment) {
		throw new Error('Establishment not available for purchase');
	}

	if (player.money < establishment.cost) {
		throw new Error('Player cannot afford establishment');
	}

	const updatedPlayer = {
		...player,
		money: player.money - establishment.cost,
		establishments: [
			...player.establishments,
			establishment,
		],
	};

	return {
		...game,
		bank: game.bank + establishment.cost,
		establishments: game.establishments.filter(e => e.id !== establishmentId),
		players: [
			...game.players.filter(p => p.id !== playerId),
			updatedPlayer,
		],
	};
}

export default function app() {
}

