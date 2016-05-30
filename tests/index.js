import test from 'tape';

import {
	addPlayerToGame,
	createGame,
	createPlayer,
	purchaseEstablishment,
	setMoney,
} from '../src/index';

function baseSinglePlayerGame() {
	const game = addPlayerToGame(
		createGame('Single Player Game'),
		createPlayer('Single Player')
	);

	return {
		game,
		firstPlayer: game.players[0],
		firstEstablishment: game.establishments[0],
	};
}

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

test('A player can be added to a game', (t) => {
	t.equal(createGame().players.length, 0);

	const game = baseSinglePlayerGame().game;

	t.equal(game.players.length, 1);
	t.end();
});

test("A player's cash on hand can be manually set", (t) => {
	const newMoney = 50;
	const { game: baseGame, firstPlayer: player } = baseSinglePlayerGame();

	t.equal(baseGame.players[0].money, 0, 'Player initially has no money');

	const game = setMoney(baseGame, player.id, newMoney);

	t.equal(game.players.length, 1, 'No phantom players were added...');
	t.equal(game.players[0].money, newMoney, `Player now has ${newMoney} money`);

	t.end();
});

test('Player cannot purchase an establishment if they have inadequate funds', (t) => {
	const {
		game,
		firstPlayer: player,
		firstEstablishment: establishment,
	} = baseSinglePlayerGame();

	t.throws(purchaseEstablishment.bind(undefined, game, {
		playerId: player.id,
		establishmentId: establishment.id,
	}));

	t.end();
});

test('Player can purchase an establishment, given proper funds', (t) => {
	const {
		game: baseGame,
		firstPlayer: player,
		firstEstablishment: establishment,
	} = baseSinglePlayerGame();

	const moneyGame = setMoney(baseGame, player.id, Number.MAX_VALUE);
	const game = purchaseEstablishment(moneyGame, {
		playerId: player.id,
		establishmentId: establishment.id,
	});

	t.equal(game.players[0].establishments.length, 3);

	t.end();
});
