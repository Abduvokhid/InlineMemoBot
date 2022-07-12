import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import { BotError, GrammyError, HttpError, webhookCallback } from 'grammy'
import bot from './bot'
import middlewares from './server/middlewares'
import onStartup from './server/on-startup'
import addButton from './server/add-button'
import { Error } from 'mongoose'
import { logger } from './utils'
import { MyContext } from './types'

const app = express()

middlewares.setup(app)

app.post('/telegram/bot', webhookCallback(bot, 'express', { secretToken: process.env.BOT_SECRET }))
app.post('/buttons/add', addButton)

async function botErrorHandler (err: BotError<MyContext>) {
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

process.on('uncaughtException', async (error: Error) => {
  logger.info('Thrown uncaughtException!')
  if (error instanceof BotError) await botErrorHandler(error as BotError<MyContext>)
  else logger.error(error)
})

process.on('unhandledRejection', async (error: Error) => {
  logger.info('Thrown unhandledRejection!')
  if (error instanceof BotError) await botErrorHandler(error as BotError<MyContext>)
  else logger.error(error)
})

app.use(async (err: Error | BotError, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof BotError) {
    logger.info('Thrown BotError exception!')
    await botErrorHandler(err as BotError<MyContext>)
    res.status(200).send({})
  } else {
    logger.info('Thrown Express exception!')
    res.status(500).send({ error: 'Something went wrong' })
  }
})

app.listen(process.env.PORT || 5000, onStartup.setup)
