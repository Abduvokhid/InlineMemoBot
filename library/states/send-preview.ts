import { MyPrivateContext } from '../../types'
import { InlineKeyboard } from 'grammy'
import { Message } from 'grammy/out/types'
import { MessageEntity } from '@grammyjs/types/message'
import { Other } from '@grammyjs/hydrate'
import { generateKeyboard } from '../../utils/misc'

function captionOptions (caption: string | undefined, entities: MessageEntity[] | undefined): Other<any> {
  if (!caption) return {}
  return {
    caption: caption,
    caption_entities: entities,
    parse_mode: entities && entities.length > 0 ? undefined : 'HTML'
  }
}

async function sendPreview (ctx: MyPrivateContext) {
  const { sections: { enhance_post }, buttons } = ctx.state.translation!
  const { post, credentials } = ctx.session
  const token = credentials!.token

  if (!post) return

  const keyboard = new InlineKeyboard()
  let preview: Message

  switch (post.type) {
    case 'text':
      const options = post.entities && post.entities.length > 0 ? {
        entities: post.entities,
        parse_mode: undefined
      } : {}
      preview = await ctx.reply(post.content, {
        ...options,
        reply_markup: generateKeyboard(post.buttons, token),
        disable_web_page_preview: post.disable_preview
      })
      const entity = preview.entities?.find(entity => entity.type === 'url')
      if (entity) keyboard.text(buttons.enable_preview, 'toggle_preview').row()
      else post.disable_preview = undefined
      break
    case 'animation':
      preview = await ctx.replyWithAnimation(post.content, {
        ...captionOptions(post.caption, post.entities),
        reply_markup: generateKeyboard(post.buttons, token)
      })
      if (preview.caption) keyboard.text(buttons.remove_caption, 'remove_caption').row()
      break
    case 'audio':
      preview = await ctx.replyWithAudio(post.content, {
        ...captionOptions(post.caption, post.entities),
        reply_markup: generateKeyboard(post.buttons, token)
      })
      if (preview.caption) keyboard.text(buttons.remove_caption, 'remove_caption').row()
      break
    case 'document':
      preview = await ctx.replyWithDocument(post.content, {
        ...captionOptions(post.caption, post.entities),
        reply_markup: generateKeyboard(post.buttons, token)
      })
      if (preview.caption) keyboard.text(buttons.remove_caption, 'remove_caption').row()
      break
    case 'photo':
      preview = await ctx.replyWithPhoto(post.content, {
        ...captionOptions(post.caption, post.entities),
        reply_markup: generateKeyboard(post.buttons, token)
      })
      if (preview.caption) keyboard.text(buttons.remove_caption, 'remove_caption').row()
      break
    case 'video':
      preview = await ctx.replyWithVideo(post.content, {
        ...captionOptions(post.caption, post.entities),
        reply_markup: generateKeyboard(post.buttons, token)
      })
      if (preview.caption) keyboard.text(buttons.remove_caption, 'remove_caption').row()
      break
    case 'voice':
      preview = await ctx.replyWithVoice(post.content, {
        ...captionOptions(post.caption, post.entities),
        reply_markup: generateKeyboard(post.buttons, token)
      })
      if (preview.caption) keyboard.text(buttons.remove_caption, 'remove_caption').row()
      break
  }
  keyboard.text(buttons.go_back, 'create_post').text(buttons.confirm_post, 'confirm_post').row()
  post.preview_id = preview!.message_id.toString()

  const settings = await ctx.reply(enhance_post.content, {
    reply_markup: keyboard
  })
  post.settings_id = settings!.message_id.toString()

  ctx.session.step = 'enhance_post'

}

export default sendPreview
