import { MyPrivateContext } from '../types'
import { help, sponsors } from '../library/commands'

async function homeText (ctx: MyPrivateContext) {
  const { menu } = ctx.state.translation!
  switch (ctx.message!.text) {
    case menu.create_post:
      break
    case menu.sponsors:
      await sponsors(ctx)
      break
    case menu.about_us:
      await help(ctx)
      break
    default:
      break
  }
}

export {
  homeText
}
