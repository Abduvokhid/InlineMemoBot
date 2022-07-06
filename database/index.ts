import { logger } from '../utils'
import mongoose from 'mongoose'
import { MyContext, SessionData } from '../types'
import { Bot, session } from 'grammy'
import { MongoDBAdapter, ISession } from '@grammyjs/storage-mongodb'

async function setup (bot: Bot<MyContext>) {
  logger.info('Connecting to database...')

  const uri = process.env.MONGO_URI
  if (!uri) throw new Error('Mongo URI is required!')
  await mongoose.connect(uri)

  logger.info('Connected to database...')

  const collection = mongoose.connection.db.collection<ISession>('sessions')
  bot.use(session({
    initial: (): SessionData => ({
      step: 'home'
    }),
    storage: new MongoDBAdapter({ collection })
  }))

  logger.info('Session initialized...')
}

export default { setup }
