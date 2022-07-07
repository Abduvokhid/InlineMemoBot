import { MyPrivateContext, Post } from '../types'
import { start } from '../library/commands'
import sendPreview from '../library/states/send-preview'

async function postStep (ctx: MyPrivateContext) {
  const { buttons } = ctx.state.translation!

  const {
    // Not allowed
    poll, dice, game, invoice, media_group_id, contact, sticker, video_note, venue, location,
    // Allowed
    text, animation, audio, document, photo, video, voice,
    // Entities
    caption, entities, caption_entities
  } = ctx.message!

  if (poll || dice || game || invoice || media_group_id || contact || sticker || video_note || venue || location)
    return await ctx.deleteMessage()

  let post: Post = { type: 'text', content: '' }

  if (text) {
    if (text === buttons.go_back) return await start(ctx)
    post = { type: 'text', content: text, entities: entities, disable_preview: true }
  } else if (animation) {
    post = { type: 'animation', content: animation.file_id, caption: caption, entities: caption_entities }
  } else if (audio) {
    post = { type: 'audio', content: audio.file_id, caption: caption, entities: caption_entities }
  } else if (document) {
    post = { type: 'document', content: document.file_id, caption: caption, entities: caption_entities }
  } else if (photo) {
    post = { type: 'photo', content: photo[photo.length - 1].file_id, caption: caption, entities: caption_entities }
  } else if (video) {
    post = { type: 'video', content: video.file_id, caption: caption, entities: caption_entities }
  } else if (voice) {
    post = { type: 'voice', content: voice.file_id, caption: caption, entities: caption_entities }
  }

  ctx.session.post = post
  await sendPreview(ctx)

}

export default postStep
