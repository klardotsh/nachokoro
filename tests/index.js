import test from 'tape';

import {
	createGame,
	createPlayer,
} from '../src/index';

test('Base game initializes to what you get in a box', (t) => {
	const gameName = 'Test Game';
	const game = createGame(gameName);

	t.equal(game.name, gameName);
	t.equal(game.bank, Infinity);
	t.equal(game.maxPlayers, 4);
	t.equal(game.players.length, 0);
	t.equal(game.establishments.length, 84);

	t.end();
});

test('Players start with 4 unbuilt landmarks', (t) => {
	const playerName = 'Test Player';
	const { landmarks: lms } = createPlayer(playerName);

	t.equal(lms.length, 4);

	const built = [];
	const unbuilt = [];

	for (const lm of lms) {
		(lm.built ? built : unbuilt).push(lm);
	}

	t.equal(built.length, 0);
	t.equal(unbuilt.length, 4);

	t.end();
});

test('Players start with a Wheat Field and Bakery as establishments', (t) => {
	const playerName = 'Test Player';
	const { establishments: es } = createPlayer(playerName);

	t.equal(es.length, 2);

	const wf = es.filter(e => e.title === 'Wheat Field');
	const bk = es.filter(e => e.title === 'Bakery');

	t.equal(wf.length, 1);
	t.equal(bk.length, 1);

	t.end();
});

