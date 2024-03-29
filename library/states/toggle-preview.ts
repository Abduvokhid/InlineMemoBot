import { MyContext } from '../../types'
import { InlineKeyboard } from 'grammy'
import { generateKeyboard } from '../../utils/misc'

async function togglePreview (ctx: MyContext) {
  const { post, credentials } = ctx.session
  const token = credentials!.token
  const { buttons } = ctx.state.translation!
  if (post && post.type === 'text' && typeof post.disable_preview === 'boolean') {
    const disable_preview = !post.disable_preview
    const options = post.entities && post.entities.length > 0 ? {
      entities: post.entities,
      parse_mode: undefined
    } : {}
    await ctx.api.editMessageText(
      ctx.chat!.id,
      parseInt(post.preview_id!),
      post.content,
      { ...options, disable_web_page_preview: disable_preview, reply_markup: generateKeyboard(post.buttons, token) }
    )
    const keyboard = new InlineKeyboard()
      .text(disable_preview ? buttons.enable_preview : buttons.disable_preview, 'toggle_preview').row()
      .text(buttons.go_back, 'create_post').text(buttons.confirm_post, 'confirm_post').row()
    await ctx.api.editMessageReplyMarkup(ctx.chat!.id, ctx.callbackQuery!.message!.message_id, { reply_markup: keyboard })
    post.disable_preview = disable_preview
    await ctx.answerCallbackQuery()
  }
}

export default togglePreview
