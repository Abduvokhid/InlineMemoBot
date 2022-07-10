import { MyContext } from '../types'
import { Bot } from 'grammy'
import { logger } from '../utils'
import { isPrivate } from '../filters'
import handleMessages from './handle-messages'
import handleInline from './handle-inline'
import handleQuery from './handle-query'

async function setup (bot: Bot<MyContext>) {
  logger.info('Setting up handlers...')
  await handleQuery.setup(bot)
  await handleInline.setup(bot)
  await handleMessages.setup(bot.filter(isPrivate))
}

export default { setup }
