import { UserFromGetMe } from 'grammy/out/platform.node'
import bot from '../bot'
import logger from './logger'
import botCommands from './bot-commands'
import transformers from '../transformers'
import middlewares from '../middlewares'
import handlers from '../handlers'
import database from '../database'

async function onStartup (botInfo: UserFromGetMe): Promise<void> {
  logger.info('Setting up the bot...')

  await database.setup(bot)
  await botCommands.setup(bot)
  await transformers.setup(bot)
  await middlewares.setup(bot)
  await handlers.setup(bot)

  logger.info('Starting the bot...')
  logger.info(JSON.stringify(botInfo))
}

export default onStartup
