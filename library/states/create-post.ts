import { MyContext } from '../../types'
import { InlineKeyboard } from 'grammy'

async function createPost (ctx: MyContext) {
  const { buttons, sections: { create_post } } = ctx.state.translation!
  const inline_keyboard = new InlineKeyboard()
    .text(buttons.go_back, 'home').row()

  await ctx.editMessageText(create_post.content, {
    reply_markup: inline_keyboard
  })

  if (ctx.session.post?.preview_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.post.preview_id))

  ctx.session.step = 'create_post'
  ctx.session.post = undefined
  ctx.session.current_id = ctx.callbackQuery?.message?.message_id.toString()
  await ctx.answerCallbackQuery()
}

export default createPost
