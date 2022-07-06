import { MyPrivateContext, Post } from '../types'

async function postStep (ctx: MyPrivateContext) {
  const {} = ctx.state.translation!

  const {
    // Not allowed
    poll, dice, game, invoice, media_group_id, contact, sticker, video_note, venue, location,
    // Allowed
    text, animation, audio, document, photo, video, voice,
    // Entities
    entities, caption_entities
  } = ctx.message!

  if (poll || dice || game || invoice || media_group_id || contact || sticker || video_note || venue || location) return

  let post: Post = { type: 'text', content: '' }

  if (text) {

    post = { type: 'text', content: text, entities: entities }
    const options = post.entities && post.entities.length > 0 ? { entities: post.entities, parse_mode: undefined } : {}
    await ctx.reply(post.content, options)

  } else if (animation) {

    post = { type: 'animation', content: animation.file_id, entities: caption_entities }
    const options = post.entities && post.entities.length > 0 ? {
      caption_entities: post.entities,
      parse_mode: undefined
    } : {}
    await ctx.api.sendAnimation(ctx.message!.from!.id, post.content, options)

  } else if (audio) {

    post = { type: 'audio', content: audio.file_id, entities: caption_entities }
    const options = post.entities && post.entities.length > 0 ? {
      caption_entities: post.entities,
      parse_mode: undefined
    } : {}
    await ctx.api.sendAudio(ctx.message!.from!.id, post.content, options)

  } else if (document) {

    post = { type: 'document', content: document.file_id, entities: caption_entities }
    const options = post.entities && post.entities.length > 0 ? {
      caption_entities: post.entities,
      parse_mode: undefined
    } : {}
    await ctx.api.sendDocument(ctx.message!.from!.id, post.content, options)

  } else if (photo) {

    post = { type: 'photo', content: photo[photo.length - 1].file_id, entities: caption_entities }
    const options = post.entities && post.entities.length > 0 ? {
      caption_entities: post.entities,
      parse_mode: undefined
    } : {}
    await ctx.api.sendPhoto(ctx.message!.from!.id, post.content, options)

  } else if (video) {

    post = { type: 'video', content: video.file_id, entities: caption_entities }
    const options = post.entities && post.entities.length > 0 ? {
      caption_entities: post.entities,
      parse_mode: undefined
    } : {}
    await ctx.api.sendVideo(ctx.message!.from!.id, post.content, options)

  } else if (voice) {

    post = { type: 'voice', content: voice.file_id, entities: caption_entities }
    const options = post.entities && post.entities.length > 0 ? {
      caption_entities: post.entities,
      parse_mode: undefined
    } : {}
    await ctx.api.sendVoice(ctx.message!.from!.id, post.content, options)

  }

  ctx.session.post = post

}

export default postStep
