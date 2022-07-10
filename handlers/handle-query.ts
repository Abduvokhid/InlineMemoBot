import { MyContext } from '../types'
import { Composer } from 'grammy'
import { logger } from '../utils'
import sponsors from '../library/commands/sponsors'
import { about, start } from '../library/commands'
import createPost from '../library/states/create-post'
import togglePreview from '../library/states/toggle-preview'
import removeCaption from '../library/states/remove-caption'
import confirmPost from '../library/states/confirm-post'
import { generateKeyboard } from '../utils/misc'

async function handleQuery (ctx: MyContext) {
  const { data } = ctx.callbackQuery!
  if (!data) return
  const parts = data.split(':')
  switch (parts[0]) {
    case 'remove_button':
      const { post } = ctx.session
      if (!post) return
      const { buttons } = post
      if (!buttons) return
      const indexes = parts[1].split('-')
      if (indexes.length !== 2) return

      if (buttons[parseInt(indexes[0])]) {
        if (buttons[parseInt(indexes[0])][parseInt(indexes[1])]) {
          buttons[parseInt(indexes[0])].splice(parseInt(indexes[1]), 1)
          if (buttons[parseInt(indexes[0])].length === 0) buttons.splice(parseInt(indexes[0]), 1)
        }
      }

      await ctx.editMessageReplyMarkup({ reply_markup: generateKeyboard(buttons, ctx.session.credentials!.token!) })
      break
    case 'r':
      parts.splice(0, 1)
      const text = parts.join(':')
      await ctx.answerCallbackQuery({ text: text, show_alert: true })
      break
  }
  await ctx.answerCallbackQuery()
}

async function setup (bot: Composer<MyContext>) {
  bot.callbackQuery('home', start)
  bot.callbackQuery('create_post', createPost)
  bot.callbackQuery('sponsors', sponsors)
  bot.callbackQuery('about_us', about)
  bot.callbackQuery('toggle_preview', togglePreview)
  bot.callbackQuery('remove_caption', removeCaption)
  bot.callbackQuery('confirm_post', confirmPost)
  bot.on('callback_query', handleQuery)
}

export default { setup }
