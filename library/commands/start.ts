import { MyPrivateContext } from '../../types'
import { Keyboard } from 'grammy'

async function
start (ctx: MyPrivateContext) {
  const { menu, sections: { main } } = ctx.state.translation!
  const keyboard = new Keyboard()
    .text(menu.create_post).row()
    .text(menu.sponsors).text(menu.about_us).row()

  await ctx.reply(main.content, {
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      input_field_placeholder: main.placeholder,
      keyboard: keyboard.build()
    }
  })

  ctx.session.step = 'home'
  ctx.session.post = undefined
}

export default start
