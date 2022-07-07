import { MyPrivateContext } from '../../types'
import { Keyboard } from 'grammy'

async function start (ctx: MyPrivateContext) {
  await startCustom(ctx)
}

async function startCustom (ctx: MyPrivateContext, text: string | undefined = undefined) {
  const { menu, sections: { main } } = ctx.state.translation!
  const keyboard = new Keyboard()
    .text(menu.create_post).row()
    .text(menu.sponsors).text(menu.about_us).row()

  await ctx.reply(text ?? main.content, {
    reply_markup: {
      resize_keyboard: true,
      input_field_placeholder: main.placeholder,
      keyboard: keyboard.build()
    }
  })

  ctx.session.step = 'home'
  ctx.session.post = undefined
}

export { startCustom }
export default start
