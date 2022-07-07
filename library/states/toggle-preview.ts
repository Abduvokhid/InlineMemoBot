import { MyPrivateContext } from '../../types'
import { Keyboard } from 'grammy'

async function togglePreview (ctx: MyPrivateContext, disable: boolean) {
  const { post } = ctx.session
  const { buttons, sections: { enhance_post } } = ctx.state.translation!
  if (post && post.type === 'text') {
    ctx.session.post!.disable_preview = disable
    await ctx.deleteMessage()
    const options = post.entities && post.entities.length > 0 ? { entities: post.entities, parse_mode: undefined } : {}
    await ctx.api.editMessageText(
      ctx.from!.id,
      parseInt(post.preview_id!),
      post.content,
      { ...options, disable_web_page_preview: post.disable_preview }
    )
    await ctx.api.deleteMessage(ctx.from!.id, parseInt(post.settings_id!))
    const keyboard = new Keyboard()
      .text(post.disable_preview ? buttons.enable_preview : buttons.disable_preview).row()
      .webApp(buttons.add_buttons, process.env.BUTTONS_URL!).row()
      .text(buttons.go_back).text(buttons.confirm_post).row()
    const settings = await ctx.reply(enhance_post.content, {
      disable_notification: true,
      reply_markup: {
        keyboard: keyboard.build(),
        input_field_placeholder: enhance_post.placeholder,
        resize_keyboard: true
      }
    })
    post.settings_id = settings!.message_id.toString()
  }
}

export default togglePreview
