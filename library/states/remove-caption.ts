import { MyPrivateContext } from '../../types'
import { Keyboard } from 'grammy'

async function removeCaption (ctx: MyPrivateContext) {
  const { post } = ctx.session
  const { buttons, sections: { enhance_post } } = ctx.state.translation!
  if (post && post.type !== 'text') {
    ctx.session.post!.caption = undefined
    ctx.session.post!.entities = undefined
    await ctx.deleteMessage()
    await ctx.api.editMessageCaption(
      ctx.from!.id,
      parseInt(post.preview_id!),
      { caption: '' }
    )
    await ctx.api.deleteMessage(ctx.from!.id, parseInt(post.settings_id!))
    const keyboard = new Keyboard()
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

export default removeCaption
