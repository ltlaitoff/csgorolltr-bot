# Csgorolltr bot

Hi! Its for bot for [csgorolltr](https://www.csgorolltr.com/en/withdraw/csgo/p2p) website.

Bot possibilities: [link](https://github.com/ltlaitoff/csgorolltr-bot/blob/main/README.md#possibilities)

How to install? [link](https://github.com/ltlaitoff/csgorolltr-bot/blob/main/README.md#possibilities)

Bot configs: [link](https://github.com/ltlaitoff/csgorolltr-bot/blob/main/README.md#possibilities)

If you wanna support me: <a href="https://www.buymeacoffee.com/ltlaitoff"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=ltlaitoff&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> <a href="https://steamcommunity.com/tradeoffer/new/?partner=1117923836&token=OGmuhFb0"><img src="https://png2.cleanpng.com/sh/e19282bb49f411a4eff4b0814fde464f/L0KzQYm3V8E0N5ZngJH0aYP2gLBuTgN1bZJyRdV4bYD4hLb5Tflkd594Rd1ybHzogn74lfVmdl5nhNNsaz35cb39hb1kd6N1Rd54YXSwhLnsTfFvcZ5mjNt4bj24coWCVPM6P2drUalsNj61RYi8Vsk5OWI6S6MAM0C2SYK7VccyNqFzf3==/kisspng-steam-computer-icons-killer-queen-black-valve-corp-load-the-animation-5b494c976f97c6.2575698115315303914571.png" width="69px" /></a>

## Possibilities

- Auto get cards filtered by wear, name, brand and csgorolltr type(green flash, yellow flash or yellow warning)
- Auto click on get gems
- Auto click 'Withdraw' after adding item to cart
- Auto send message to telegram on you item is sold

## Installation

We have two ways: [With default config](https://github.com/ltlaitoff/csgorolltr-bot/blob/mainREADME.md#possibilities) and [With custom config](https://github.com/ltlaitoff/csgorolltr-bot/blob/main/README.md#possibilities)

For both paths we need an installed [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

### With default config

For install with default config we need:

- Create new `script` in [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Copy built code from `./dist/main.js` file
- Put copied code into `Tampermonkey`
- Go to `https://www.csgorolltr.com/en/withdraw/csgo/p2p` for test bot

### With custom config

For install with custom config we need installed: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [NodeJS 18.16.0+](https://nodejs.org/en), npm(comes with NodeJS by default), [git](https://git-scm.com/)

First of all clone repozitory:

```sh
git clone https://github.com/ltlaitoff/csgorolltr-bot.git
cd csgorolltr-bot
```

Install all project dependencies:

```sh
npm install
```

On now we can open `./src/config/config.js` file and edit config

After editing type build command(presented below) and get our `./build/main.js` file

Build command:

```sh
npm run build
```

After created built code go to [With default config](https://github.com/ltlaitoff/csgorolltr-bot/blob/webpack-install/README.md#possibilities) way

## Configs

Config file: `./src/config/config.js`

| Field name                            | Type                  | Default          | Description                                                                                                                                                |
| ------------------------------------- | --------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BOT_NAME                              | String                | 'CSGOrolltr-bot' | Bot name                                                                                                                                                   |
| DELAY                                 | Number (ms)           | 500              | Delay between bot get cards cycles                                                                                                                         |
| AUTO_WITHDRAW                         | Boolean               | true             | After click on item auto click on 'Withdraw' button for auto-buy                                                                                           |
| ITEMS_PER_CYCLE                       | Number                | 3                | How much cards bot get per one cycle                                                                                                                       |
| AUTO_GEM_DROP_DELAY                   | Number (ms)           | 5000             | Delay between bot check gem drop for auto click                                                                                                            |
| AUTO_ITEM_SELL_DELAY                  | Number (ms)           | 5000             | Delay between bot check user item sold for send telegram message                                                                                           |
| DEV_LOGS                              | Boolean               | false            | Developer logs                                                                                                                                             |
| LOGS                                  | Boolean               | false            | Logs                                                                                                                                                       |
| DEFAULT_FIND_MODE                     | FIND_MODES            | greenFlash       | Default bot mode for get cards                                                                                                                             |
| TELEGRAM_BOT_TOKEN                    | String                | ''               | To send a message to telegram when item sold. For get bot_toket you must create new telegram bot in [BotFather](https://t.me/BotFather)                    |
| TELEGRAM_BOT_USER                     | Number                | -1               | Telegram user id to send a message to telegram when item sold. For get you telegram id you can use [GetAnyTelegramIdBot](https://t.me/GetAnyTelegramIdBot) |
| KEYS                                  |                       |                  |                                                                                                                                                            |
| KEYS.startAndStop                     | String                | Equal            | Key for `Start` and `Stop` bot                                                                                                                             |
| KEYS.findGreenFlash                   | String                | KeyG             | Key for set `greenFlash` mode                                                                                                                              |
| KEYS.findYellowFlash                  | String                | KeyY             | Key for set `yellowFlash` mode                                                                                                                             |
| KEYS.findYellowWarning                | String                | KeyW             | Key for set `YellowWarning` mode                                                                                                                           |
| KEYS.findAll                          | String                | KeyA             | Key for set `all` mode                                                                                                                                     |
| KEYS.findGreenFlash AndYellowWarning   | String                | KeyB             | Key for set `greenFlashAndYellowWarning` mode                                                                                                              |
| KEYS.updateShowStatus                 | String                | KeyU             | Key for update bot if he lags on load and dont show menu... ya                                                                                             |
| FIND_MODES                            |                       |                  |                                                                                                                                                            |
| FIND_MODES.greenFlash                 | String                | #4ade80          | Color for `greenFlash` mode                                                                                                                                |
| FIND_MODES.yellowFlash                | String                | #facc15          | Color for `yellowFlash` mode                                                                                                                               |
| FIND_MODES.yellowWarning              | String                | #f87171          | Color for `yellowWarning` mode                                                                                                                             |
| FIND_MODES.all                        | String                | #f3f4f6          | Color for `all` mode                                                                                                                                       |
| FIND_MODES.greenFlash AndYellowWarning | String                | #7dd3fc          | Color for `greenFlashAndYellowWarning` mode                                                                                                                |
| UNTRACKED_WEAR                        | String[]              | ['WW', 'BS']     | Untracked wears from website. Example(which i found): 'FN', 'MW', 'FT', 'WW', 'BS', 'Holo', 'Foil', 'Gold'                                                 |
| UNTRACKED                             | Array<UNTRACKED_ITEM> | []               |                                                                                                                                                            |
| UNTRACKED_ITEM.name                   | String or null        | null             | Untrack card by name                                                                                                                                       |
| UNTRACKED_ITEM.brand                  | String or null        | null             | Untrack card by brand                                                                                                                                      |
