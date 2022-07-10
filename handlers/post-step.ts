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

  let post: Post = { buttons: [], type: 'text', content: '' }

  if (text) {
    if (text === buttons.go_back) return await start(ctx)
    post = { buttons: [], type: 'text', content: text, entities: entities, disable_preview: true }
  } else if (animation) {
    post = { buttons: [], type: 'animation', content: animation.file_id, caption: caption, entities: caption_entities }
  } else if (audio) {
    post = { buttons: [], type: 'audio', content: audio.file_id, caption: caption, entities: caption_entities }
  } else if (document) {
    post = { buttons: [], type: 'document', content: document.file_id, caption: caption, entities: caption_entities }
  } else if (photo) {
    post = { buttons: [], type: 'photo', content: photo[photo.length - 1].file_id, caption: caption, entities: caption_entities }
  } else if (video) {
    post = { buttons: [], type: 'video', content: video.file_id, caption: caption, entities: caption_entities }
  } else if (voice) {
    post = { buttons: [], type: 'voice', content: voice.file_id, caption: caption, entities: caption_entities }
  }

  ctx.session.post = post
  await sendPreview(ctx)
  if (ctx.session.current_id) {
    await ctx.api.editMessageReplyMarkup(ctx.chat!.id, parseInt(ctx.session.current_id))
    ctx.session.current_id = undefined
  }
}

export default postStep
