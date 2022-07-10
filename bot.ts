import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../.env` })

import { Bot } from 'grammy'
import { MyApi, MyContext } from './types'
import { logger, onShutdown, onStartup } from './utils'

const token = process.env.BOT_TOKEN
if (!token) throw new Error('Bot token is required!')

const bot = new Bot<MyContext, MyApi>(token)

process.once('SIGINT', async () => {
  logger.info('SIGINT')
  await onShutdown(bot)
})

process.once('SIGTERM', async () => {
  logger.info('SIGTERM')
  await onShutdown(bot)
})

bot.init().then(_ => {
  onStartup(bot.botInfo).then()
})


// bot.start({
//   drop_pending_updates: true,
//   allowed_updates: [
//     'message', 'inline_query', 'callback_query'
//   ],
//   onStart: onStartup
// })

export default bot
