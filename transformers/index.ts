import { Bot } from 'grammy'
import { MyApi, MyContext } from '../types'

import { hydrateApi } from '@grammyjs/hydrate'
import { parseMode } from '@grammyjs/parse-mode'
import { logger } from '../utils'
import loggingApiCalls from './logging-api-calls'

async function setup (bot: Bot<MyContext, MyApi>) {
  logger.info('Setting up API transformers...')

  // TODO: Add API throttler from https://github.com/askador/grammY-bot-template
  bot.api.config.use(loggingApiCalls)
  bot.api.config.use(hydrateApi())
  bot.api.config.use(parseMode('HTML'))
}

export default { setup }
