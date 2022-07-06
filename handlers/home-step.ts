import { MyPrivateContext } from '../types'
import { about, sponsors } from '../library/commands'
import createPost from '../library/states/create-post'
import postStep from './post-step'

async function homeText (ctx: MyPrivateContext) {
  const { menu } = ctx.state.translation!
  switch (ctx.message!.text) {
    case menu.create_post:
      await createPost(ctx)
      break
    case menu.sponsors:
      await sponsors(ctx)
      break
    case menu.about_us:
      await about(ctx)
      break
    default:
      await postStep(ctx)
      break
  }
}

export {
  homeText
}
