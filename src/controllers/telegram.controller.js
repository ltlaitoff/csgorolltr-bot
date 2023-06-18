import { TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_USER } from '../config/config'

const sendTelegramBotMessage = text => {
	const date = new Date(Date.now())
	const currentTime = `${
		date.getUTCHours() - date.getTimezoneOffset() / 60
	}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`

	const textForSend = `[${currentTime}] ${text}`

	fetch(
		`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_BOT_USER}&text=${textForSend}`,
		{
			method: 'POST'
		}
	)
}

export { sendTelegramBotMessage }
