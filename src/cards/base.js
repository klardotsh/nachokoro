import { ACTIONS, CARD_PRIORITIES, ESTABLISHMENT_TYPES, SOURCES } from '../consts';

export function radioTowerEffect(player) {
	return {
		player: {
			...player,
			rollsAllowedPerTurn: 2,
		},
	};
}

export function amusementParkEffect(player) {
	const extraTurnWhen = player.extraTurnWhen ?
		[...player.extraTurnWhen, 'doubles'] :
		['doubles'];

	return {
		player: {
			...player,
			extraTurnWhen,
		},
	};
}

export function shoppingMallEffect(player) {
	const addedBonuses = {
		[ESTABLISHMENT_TYPES.COFFEE]: 1,
		[ESTABLISHMENT_TYPES.GOODS]: 1,
	};

	if (player.bonuses) {
		Object.keys(player.bonuses).forEach((k) => {
			addedBonuses[k] = player.bonuses[k] + (addedBonuses[k] || 0);
		});
	}

	return {
		player: {
			...player,
			bonuses: addedBonuses,
		},
	};
}

export function trainStationEffect(player) {
	return {
		player: {
			...player,
			diceAvailable: 2,
		},
	};
}

export const ESTABLISHMENTS = [
	{
		title: 'Wheat Field',
		subtitle: "Get 1 coin from the bank, on anyone's turn.",
		type: ESTABLISHMENT_TYPES.GRAIN,
		count: 6,
		cost: 1,
		active: [1],
		spawn: true,
		priority: CARD_PRIORITIES.BLUE,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 1,
				source: SOURCES.BANK,
			},
		],
	},
	{
		title: 'Ranch',
		subtitle: "Get 1 coin from the bank, on anyone's turn.",
		type: ESTABLISHMENT_TYPES.CATTLE,
		count: 6,
		cost: 1,
		active: [2],
		spawn: false,
		priority: CARD_PRIORITIES.BLUE,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 1,
				source: SOURCES.BANK,
			},
		],
	},
	{
		title: 'Bakery',
		subtitle: 'Get 1 coin from the bank, on your turn only.',
		type: ESTABLISHMENT_TYPES.GOODS,
		count: 6,
		cost: 1,
		active: [2, 3],
		spawn: true,
		priority: CARD_PRIORITIES.GREEN,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 1,
				source: SOURCES.BANK,
			},
		],
	},
	{
		title: 'Café',
		subtitle: 'Get 1 coin from the player who rolled the dice.',
		type: ESTABLISHMENT_TYPES.COFFEE,
		count: 6,
		cost: 2,
		active: [3],
		spawn: false,
		priority: CARD_PRIORITIES.RED,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 1,
				source: SOURCES.ROLLER,
			},
		],
	},
	{
		title: 'Convenience Store',
		subtitle: 'Get 3 coins from the bank, on your turn only.',
		type: ESTABLISHMENT_TYPES.GOODS,
		count: 6,
		cost: 2,
		active: [4],
		spawn: false,
		priority: CARD_PRIORITIES.GREEN,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 3,
				source: SOURCES.BANK,
			},
		],
	},
	{
		title: 'Forest',
		subtitle: "Get 1 coin from the bank, on anyone's turn.",
		type: ESTABLISHMENT_TYPES.FACTORY,
		count: 6,
		cost: 3,
		active: [5],
		spawn: false,
		priority: CARD_PRIORITIES.BLUE,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 1,
				source: SOURCES.BANK,
			},
		],
	},
	{
		title: 'Business Center',
		subtitle: 'Trade one non-TOWER establishment with another player, on your turn only.',
		type: ESTABLISHMENT_TYPES.TOWER,
		count: 4,
		cost: 8,
		active: [6],
		spawn: false,
		priority: CARD_PRIORITIES.PURPLE,
		actions: [
			{
				type: ACTIONS.TRADE,
				count: 1,
				source: SOURCES.CHOICE,
			},
		],
	},
	{
		title: 'Stadium',
		subtitle: 'Get 2 coins from all players, on your turn only.',
		type: ESTABLISHMENT_TYPES.TOWER,
		count: 4,
		cost: 6,
		active: [6],
		spawn: false,
		priority: CARD_PRIORITIES.PURPLE,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 2,
				source: SOURCES.ALL,
			},
		],
	},
	{
		title: 'TV Station',
		subtitle: 'Take 5 coins from any one player, on your turn only.',
		type: ESTABLISHMENT_TYPES.TOWER,
		count: 4,
		cost: 7,
		active: [6],
		spawn: false,
		priority: CARD_PRIORITIES.PURPLE,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 5,
				source: SOURCES.CHOICE,
			},
		],
	},
	{
		title: 'Cheese Factory',
		subtitle: 'Get 3 coins from the bank for each CATTLE establishment that you own, on your turn only.',
		type: ESTABLISHMENT_TYPES.PROCESSED,
		count: 6,
		cost: 5,
		active: [7],
		spawn: false,
		priority: CARD_PRIORITIES.GREEN,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 3,
				source: SOURCES.BANK,
				multiplier: ESTABLISHMENT_TYPES.CATTLE,
			},
		],
	},
	{
		title: 'Furniture Factory',
		subtitle: 'Get 3 coins from the bank for each FACTORY establishment that you own, on your turn only.',
		type: ESTABLISHMENT_TYPES.PROCESSED,
		count: 6,
		cost: 3,
		active: [8],
		spawn: false,
		priority: CARD_PRIORITIES.GREEN,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 3,
				source: SOURCES.BANK,
				multiplier: ESTABLISHMENT_TYPES.FACTORY,
			},
		],
	},
	{
		title: 'Mine',
		subtitle: "Get 5 coins from the bank, on anyone's turn.",
		type: ESTABLISHMENT_TYPES.FACTORY,
		count: 6,
		cost: 6,
		active: [9],
		spawn: false,
		priority: CARD_PRIORITIES.BLUE,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 5,
				source: SOURCES.BANK,
			},
		],
	},
	{
		title: 'Family Restaurant',
		subtitle: 'Get 2 coins from the player who rolled the dice.',
		type: ESTABLISHMENT_TYPES.COFFEE,
		count: 6,
		cost: 3,
		active: [9, 10],
		spawn: false,
		priority: CARD_PRIORITIES.RED,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 2,
				source: SOURCES.ROLLER,
			},
		],
	},
	{
		title: 'Apple Orchard',
		subtitle: "Get 3 coins from the bank, on anyone's turn.",
		type: ESTABLISHMENT_TYPES.GRAIN,
		count: 6,
		cost: 3,
		active: [10],
		spawn: false,
		priority: CARD_PRIORITIES.BLUE,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 3,
				source: SOURCES.BANK,
			},
		],
	},
	{
		title: 'Fruit and Vegetable Market',
		subtitle: 'Get 2 coins from the bank for each GRAIN establishment that you own, on your turn only.',
		type: ESTABLISHMENT_TYPES.MARKET,
		count: 6,
		cost: 2,
		active: [11, 12],
		spawn: false,
		priority: CARD_PRIORITIES.GREEN,
		actions: [
			{
				type: ACTIONS.INCOME,
				count: 2,
				source: SOURCES.BANK,
				multiplier: ESTABLISHMENT_TYPES.GRAIN,
			},
		],
	},
];

export const LANDMARKS = [
	{
		title: 'Train Station',
		subtitle: 'You may roll 1 or 2 dice.',
		cost: 4,
		effect: 'trainStationEffect',
	},
	{
		title: 'Shopping Mall',
		subtitle: 'Each of your COFFEE and GOODS establishments earn +1 coin.',
		cost: 10,
		effect: 'shoppingMallEffect',
	},
	{
		title: 'Amusement Park',
		subtitle: 'If you roll doubles, take another turn after this one.',
		cost: 16,
		effect: 'amusementParkEffect',
	},
	{
		title: 'Radio Tower',
		subtitle: 'Once every turn, you can choose to re-roll your dice.',
		cost: 22,
		effect: 'radioTowerEffect',
	},
];
