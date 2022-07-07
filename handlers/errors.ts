import { Bot, BotError, GrammyError, HttpError } from 'grammy'
import { MyContext, MyGeneralContext } from '../types'
import { logger } from '../utils'

async function errorHandler (err: BotError<MyContext | MyGeneralContext>) {
  const e = err.error
  if (e instanceof BotError) {
    logger.error(`Error in bot: ${e.ctx}`)
  } else if (e instanceof GrammyError) {
    logger.error(`Error in request: ${e.description}`)
    if (e.description.includes('can\'t parse entities')) {
      const { errors } = (err as BotError<MyContext>).ctx.state.translation!
      await err.ctx.reply(errors.invalid_tags)
    }
  } else if (e instanceof HttpError) {
    logger.error(`Could not contact Telegram: ${e}`)
  } else {
    logger.error(`Unknown error: ${e}`)
    console.error(e)
  }
}

async function setup (bot: Bot<MyContext>) {
  bot.catch(errorHandler)
}

export default { setup }
