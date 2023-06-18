/* Application main variables */
const BOT_NAME = 'CSGOrolltr-bot'
const DELAY = 500
const AUTO_WITHDRAW = true
const ITEMS_PER_CYCLE = 3

/* Auto gem */
const AUTO_GEM_DROP_DELAY = 5000
const AUTO_ITEM_SELL_DELAY = 5000

/* Logs */
const DEV_LOGS = false
const LOGS = false

/* Telegram */
const TELEGRAM_BOT_TOKEN = ''
const TELEGRAM_BOT_USER = -1

/* Keys */
// Get event.code from 'https://www.toptal.com/developers/keycode' website
const KEYS = {
	startAndStop: 'Equal',
	findGreenFlash: 'KeyG',
	findYellowFlash: 'KeyY',
	findYellowWarning: 'KeyW',
	findAll: 'KeyA',
	findGreenFlashAndYellowWarning: 'KeyB',
	updateShowStatus: 'KeyU'
}

/* Find modes colors */
// Change only color field
const FIND_MODES = {
	greenFlash: {
		color: '#4ade80'
	},
	yellowFlash: { color: '#facc15' },
	yellowWarning: {
		color: '#f87171'
	},
	all: {
		color: '#f3f4f6'
	},
	greenFlashAndYellowWarning: {
		color: '#7dd3fc'
	}
}

// Can change FIND_MODES.greenFlash to FIND_MODES.(...) for set default
const DEFAULT_FIND_MODE = FIND_MODES.greenFlash

/* Filters */

// Example: 'FN', 'MW', 'FT', 'WW', 'BS', 'Holo', 'Foil', 'Gold'
const UNTRACKED_WEAR = ['WW', 'BS']

// Add item type and item name filtration

/*
Format:
const UNTRACKED = [
	{
		name: '',
		brand: ''
	}
]

Use null for notFilter by field

{
	name: null,
	brand: 'sticker'
}
*/
const UNTRACKED = [
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	}
]

/* WARNING: NOT TOUCH */

export {
	BOT_NAME,
	DELAY,
	AUTO_WITHDRAW,
	ITEMS_PER_CYCLE,
	DEV_LOGS,
	LOGS,
	TELEGRAM_BOT_TOKEN,
	TELEGRAM_BOT_USER,
	KEYS,
	FIND_MODES,
	DEFAULT_FIND_MODE,
	UNTRACKED_WEAR,
	UNTRACKED,
	AUTO_GEM_DROP_DELAY,
	AUTO_ITEM_SELL_DELAY
}
