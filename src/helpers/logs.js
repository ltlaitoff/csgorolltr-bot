import { BOT_NAME, DEV_LOGS, LOGS } from '../config/config'

const devLog = (message, ...args) => {
	if (DEV_LOGS) {
		console.debug(`[${BOT_NAME}]: `, message, ...args)
	}
}

const log = (message, ...args) => {
	if (LOGS) {
		console.log(`[${BOT_NAME}]: `, message, ...args)
	}
}

export { devLog, log }
