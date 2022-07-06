import { Bot } from 'grammy'
import { MyApi, MyContext } from './types'

const token = process.env.BOT_TOKEN
if (!token) throw new Error('Bot token is required!')

export default new Bot<MyContext, MyApi>(token)
