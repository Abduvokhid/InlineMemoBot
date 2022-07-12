import { MyContext } from '../../types'
import { InlineKeyboard } from 'grammy'

async function removeCaption (ctx: MyContext) {
  const { post } = ctx.session
  const { buttons } = ctx.state.translation!
  if (post && post.type !== 'text') {
    ctx.session.post!.caption = undefined
    ctx.session.post!.entities = undefined
    await ctx.api.editMessageCaption(
      ctx.from!.id,
      parseInt(post.preview_id!),
      { caption: '' }
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
