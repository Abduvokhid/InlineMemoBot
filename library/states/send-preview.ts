import { MyPrivateContext } from '../../types'
import { Keyboard } from 'grammy'
import { Message } from 'grammy/out/platform.node'
import { MessageEntity } from '@grammyjs/types/message'
import { Other } from '@grammyjs/hydrate'

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
  const { post } = ctx.session

  if (!post) return

  const keyboard = new Keyboard()
  let preview: Message

  switch (post.type) {
    case 'text':
      const options = post.entities && post.entities.length > 0 ? { entities: post.entities, parse_mode: undefined } : {}
      preview = await ctx.reply(post.content, { ...options, disable_web_page_preview: post.disable_preview })
      keyboard.text(buttons.enable_preview).row()
      break
    case 'animation':
      preview = await ctx.replyWithAnimation(post.content, captionOptions(post.caption, post.entities))
      if (preview.caption) keyboard.text(buttons.remove_caption).row()
      break
    case 'audio':
      preview = await ctx.replyWithAudio(post.content, captionOptions(post.caption, post.entities))
      if (preview.caption) keyboard.text(buttons.remove_caption).row()
      break
    case 'document':
      preview = await ctx.replyWithDocument(post.content, captionOptions(post.caption, post.entities))
      if (preview.caption) keyboard.text(buttons.remove_caption).row()
      break
    case 'photo':
      preview = await ctx.replyWithPhoto(post.content, captionOptions(post.caption, post.entities))
      if (preview.caption) keyboard.text(buttons.remove_caption).row()
      break
    case 'video':
      preview = await ctx.replyWithVideo(post.content, captionOptions(post.caption, post.entities))
      if (preview.caption) keyboard.text(buttons.remove_caption).row()
      break
    case 'voice':
      preview = await ctx.replyWithVoice(post.content, captionOptions(post.caption, post.entities))
      if (preview.caption) keyboard.text(buttons.remove_caption).row()
      break
  }
  keyboard.webApp(buttons.add_buttons, process.env.BUTTONS_URL!).row()
  keyboard.text(buttons.go_back).text(buttons.confirm_post).row()
  post.preview_id = preview!.message_id.toString()

  const settings = await ctx.reply(enhance_post.content, {
    reply_markup: {
      keyboard: keyboard.build(),
      input_field_placeholder: enhance_post.placeholder,
      resize_keyboard: true
    }
  })
  post.settings_id = settings!.message_id.toString()

  ctx.session.step = 'enhance_post'

}

export default sendPreview
