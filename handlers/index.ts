import { MyContext } from '../types'
import { Bot } from 'grammy'
import { logger } from '../utils'
import errors from './errors'
import { isPrivate } from '../filters'
import handle from './handle'

async function setup (bot: Bot<MyContext>) {
  logger.info('Setting up handlers...')
  await errors.setup(bot)
  await handle.setup(bot.filter(isPrivate))
}

export default { setup }
