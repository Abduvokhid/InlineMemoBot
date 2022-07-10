import { Bot } from 'grammy'
import { MyContext } from '../types'
import { logger } from '../utils'
import { hydrateContext } from '@grammyjs/hydrate'
import userSetup from './user-setup'
import { isPrivate } from '../filters'

async function setup (bot: Bot<MyContext>) {
  logger.info('Setting up middlewares...')

  bot.use(hydrateContext())
  bot.use(async (ctx, next) => {
    // console.log(JSON.stringify(ctx.update))
    await next()
  })
  bot.filter(isPrivate).use(userSetup)
}

export default { setup }
