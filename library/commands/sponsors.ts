import { MyContext } from '../../types'
import { InlineKeyboard } from 'grammy'

async function sponsors (ctx: MyContext) {
  const { sections: { sponsors }, menu } = ctx.state.translation!

  const inline_keyboard = new InlineKeyboard()
    .text(menu.create_post, 'create_post').row()
    .text(menu.sponsors, 'sponsors').text(menu.about_us, 'about_us').row()

  const list = sponsors.list.map((sponsor, index) => `${index + 1}. <b><a href="${sponsor.link}">${sponsor.name}</a></b>\n`)
  const text = `${sponsors.content}\n${list}`

  if (ctx.callbackQuery) {
    await ctx.editMessageText(text, { disable_web_page_preview: true, reply_markup: inline_keyboard })
  } else {
    const message = await ctx.reply(text, { disable_web_page_preview: true, reply_markup: inline_keyboard })

    if (ctx.session.post?.settings_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.post!.settings_id))
    if (ctx.session.post?.preview_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.post.preview_id))
    if (ctx.session.current_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.current_id))

    ctx.session.step = 'home'
    ctx.session.post = undefined
    ctx.session.current_id = message.message_id.toString()
  }
}

export default sponsors
