import { Bot } from 'grammy'
import logger from './logger'
import { MyContext } from '../types'

async function onShutdown (bot: Bot<MyContext>): Promise<void> {
  logger.warn('Bot is stopping...')
  await bot.api.deleteWebhook({ drop_pending_updates: true })
}

export default onShutdown
