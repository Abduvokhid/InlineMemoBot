import { MyPrivateContext } from '../../types'
import { Keyboard } from 'grammy'

async function createPost (ctx: MyPrivateContext) {
  const { buttons, sections: { create_post } } = ctx.state.translation!
  const keyboard = new Keyboard()
    .text(buttons.go_back).row()

  await ctx.reply(create_post.content, {
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      input_field_placeholder: create_post.placeholder,
      keyboard: keyboard.build()
    }
  })

  ctx.session.step = 'create_post'
  ctx.session.post = undefined
}

export default createPost
