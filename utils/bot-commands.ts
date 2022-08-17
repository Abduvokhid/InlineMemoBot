import { Bot } from 'grammy'
import { BotCommand } from 'grammy/out/types'
import { type BotCommandScope } from '@grammyjs/types'
import logger from './logger'
import { MyContext } from '../types'

type BotCommandItem = {
  commands: BotCommand[],
  scope: BotCommandScope,
  language_code: string | undefined
}

const PRIVATE_CHAT_DEFAULT: BotCommandItem = {
  commands: [
    { command: 'start', description: 'Shows main menu' },
    { command: 'about', description: 'Shows bot information' },
    { command: 'sponsors', description: 'Shows sponsors list' },
  ],
  scope: { type: 'all_private_chats' },
  language_code: undefined
}

const allCommands = [
  PRIVATE_CHAT_DEFAULT
]

async function setup (bot: Bot<MyContext>) {
  logger.info('Setting up bot commands...')

  for (const { commands, scope, language_code } of allCommands) {
    await bot.api.setMyCommands(commands, { scope, language_code })
  }
}

export default { setup }
