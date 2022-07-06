import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../.env` })

import bot from './bot'
import { logger, onShutdown, onStartup } from './utils'

process.once('SIGINT', async () => {
  logger.info('SIGINT')
  await onShutdown(bot)
})

process.once('SIGTERM', async () => {
  logger.info('SIGTERM')
  await onShutdown(bot)
})

bot.start({
  drop_pending_updates: true,
  allowed_updates: [
    'message', 'callback_query', 'inline_query'
  ],
  onStart: onStartup
})
