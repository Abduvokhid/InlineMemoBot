import { MyPrivateContext } from '../../types'
import { PostDocument, PostModel } from '../../models/Post'
import { convertBase } from '../../utils/converters'
import { generateNumber } from '../../utils/generators'
import { startCustom } from '../commands'

async function confirmPost (ctx: MyPrivateContext) {
  const { sections: { confirm_post } } = ctx.state.translation!
  const { post } = ctx.session
  if (!post) return

  const unique_id = convertBase(Date.now() + generateNumber(3).toString())

  const postDocument: PostDocument = new PostModel({
    unique_id: unique_id,
    author: ctx.state.user!._id,
    type: post.type,
    content: post.content,
    disable_preview: post.disable_preview,
    caption: post.caption,
    entities: post.entities,
  })
  await postDocument.save()

  const message = `<code>@InlineMemoBot ${unique_id}</code>`
  await ctx.reply(message)
  ctx.session.post = undefined
  await startCustom(ctx, confirm_post.content)
}

export default confirmPost
