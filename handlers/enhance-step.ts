import { Button, MyPrivateContext } from '../types'
import sendPreview from '../library/states/send-preview'
import { validateUrl } from '../utils/validators'

async function enhanceStep (ctx: MyPrivateContext) {
  const { text } = ctx.message!
  if (!text) return await ctx.deleteMessage()

  const lines = text.split('\n')

  const buttons: Button[][] = []

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    const items = line.match(/\[(.*?)\]/g)
    if (items) {
      for (let item of items) {
        item = item.replace('[', '').trim()
        item = item.replace(']', '').trim()
        const details = item.split('+')
        const text = details[0].trim()
        const url = details[1].trim()
        if (validateUrl(url)) {
          if (!buttons[i]) buttons.push([])
          buttons[i].push({
            type: 'link',
            name: text,
            link: url
          })
        }
      }
    }
  }

  if (buttons.length > 0) ctx.session.post!.buttons = buttons
  try {
    if (ctx.session.post?.settings_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.post!.settings_id))
    if (ctx.session.post?.preview_id) await ctx.api.deleteMessage(ctx.chat!.id, parseInt(ctx.session.post!.preview_id))
  } catch (e: any) {
    console.error(e, e.stack)
  }
  await sendPreview(ctx)
}

export default enhanceStep
