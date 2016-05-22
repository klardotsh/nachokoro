import test from 'tape';

import { createGame } from '../src/index';

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
