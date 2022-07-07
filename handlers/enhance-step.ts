import { MyPrivateContext } from '../types'
import createPost from '../library/states/create-post'
import togglePreview from '../library/states/toggle-preview'
import removeCaption from '../library/states/remove-caption'

async function enhanceStep (ctx: MyPrivateContext) {
  const { buttons } = ctx.state.translation!
  const { text } = ctx.message!
  switch (text) {
    case buttons.go_back:
      await createPost(ctx)
      break
    case buttons.enable_preview:
      await togglePreview(ctx, false)
      break
    case buttons.disable_preview:
      await togglePreview(ctx, true)
      break
    case buttons.remove_caption:
      await removeCaption(ctx)
      break
    case buttons.confirm_post:
      break
    default:
      await ctx.deleteMessage()
  }
}

export default enhanceStep
