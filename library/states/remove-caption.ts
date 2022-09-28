import { MyContext } from '../../types'
import { InlineKeyboard } from 'grammy'
import { generateKeyboard } from '../../utils/misc'

async function removeCaption (ctx: MyContext) {
  const { post, credentials } = ctx.session
  const token = credentials!.token
  const { buttons } = ctx.state.translation!
  if (post && post.type !== 'text') {
    ctx.session.post!.caption = undefined
    ctx.session.post!.entities = undefined
    await ctx.api.editMessageCaption(
      ctx.from!.id,
      parseInt(post.preview_id!),
      { caption: '', reply_markup: generateKeyboard(post.buttons, token) }
    )
    const keyboard = new InlineKeyboard()
      .text(buttons.go_back, 'create_post').text(buttons.confirm_post, 'confirm_post').row()
    await ctx.api.editMessageReplyMarkup(ctx.chat!.id, ctx.callbackQuery!.message!.message_id, {
      reply_markup: keyboard
    })
    await ctx.answerCallbackQuery()
  }
}

export default removeCaption
