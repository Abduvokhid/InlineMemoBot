import { MyContext } from '../../types'
import { InlineKeyboard } from 'grammy'

async function start (ctx: MyContext) {
  if (ctx.callbackQuery) await ctx.deleteMessage()
  await startCustom(ctx)
}

async function startCustom (ctx: MyContext, text: string | undefined = undefined) {
  const { menu, sections: { main } } = ctx.state.translation!
  const inline_keyboard = new InlineKeyboard()
    .text(menu.create_post, 'create_post').row()
    .text(menu.sponsors, 'sponsors').text(menu.about_us, 'about_us').row()

  const message = await ctx.reply(text ?? main.content, {
    reply_markup: inline_keyboard
  })

  try {
    if (ctx.session.post?.settings_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.post!.settings_id))
    if (ctx.session.post?.preview_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.post.preview_id))
    if (ctx.session.current_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.current_id))
  } catch (e: any) {
    console.error(e, e.stack)
  }

  ctx.session.step = 'home'
  ctx.session.post = undefined
  ctx.session.current_id = message.message_id.toString()
}

export { startCustom }
export default start
