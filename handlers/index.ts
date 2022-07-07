import { MyContext } from '../types'
import { Bot } from 'grammy'
import { logger } from '../utils'
import { isPrivate } from '../filters'
import handleMessages from './handle-messages'
import handleInline from './handle-inline'
import errors from './errors'

async function setup (bot: Bot<MyContext>) {
  logger.info('Setting up handlers...')
  await errors.setup(bot)
  await handleInline.setup(bot)
  await handleMessages.setup(bot.filter(isPrivate))
}

export default { setup }
