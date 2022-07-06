import { Bot } from 'grammy'
import logger from './logger'
import { MyContext } from '../types'

async function onShutdown (bot: Bot<MyContext>): Promise<void> {
  logger.warn('Bot is stopping...')
  await bot.stop()
}

export default onShutdown
