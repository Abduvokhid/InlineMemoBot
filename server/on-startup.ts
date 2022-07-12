import { logger } from '../utils'
import bot from '../bot'

async function setup () {
  logger.info('Web server started...')
  const url = `${process.env.BOT_DOMAIN!}/telegram/bot`
  await bot.api.setWebhook(url, {
    drop_pending_updates: true,
    secret_token: process.env.BOT_SECRET,
    allowed_updates: ['message', 'inline_query', 'callback_query'],
  })
  logger.info('Webhook initialized...')
}

export default { setup }
