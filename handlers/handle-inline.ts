import { Composer } from 'grammy'
import { MyContext } from '../types'
import translation, { TranslationKey } from '../translation'
import { PostDocument, PostModel } from '../models/Post'
import { MessageEntity } from '@grammyjs/types/message'
import { InlineQueryResult } from 'grammy/out/platform.node'
import { UserModel } from '../models/User'

function generateAnswerFromPost (post: PostDocument, title: string): InlineQueryResult {
  switch (post.type) {
    case 'text':
      return {
        type: 'article',
        id: post._id,
        title: title,
        input_message_content: {
          message_text: post.content,
          entities: post.entities as MessageEntity[],
          parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
          disable_web_page_preview: post.disable_preview
        }
      }
    case 'animation':
      return {
        type: 'mpeg4_gif',
        id: post._id,
        title: title,
        mpeg4_file_id: post.content,
        caption: post.caption,
        caption_entities: post.entities as MessageEntity[],
        parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
      }
    case 'audio':
      return {
        type: 'audio',
        id: post._id,
        title: title,
        audio_file_id: post.content,
        caption: post.caption,
        caption_entities: post.entities as MessageEntity[],
        parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
      }
    case 'document':
      return {
        type: 'document',
        id: post._id,
        title: title,
        document_file_id: post.content,
        caption: post.caption,
        caption_entities: post.entities as MessageEntity[],
        parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
      }
    case 'photo':
      return {
        type: 'photo',
        id: post._id,
        title: title,
        photo_file_id: post.content,
        caption: post.caption,
        caption_entities: post.entities as MessageEntity[],
        parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
      }
    case 'video':
      return {
        type: 'video',
        id: post._id,
        title: title,
        video_file_id: post.content,
        caption: post.caption,
        caption_entities: post.entities as MessageEntity[],
        parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
      }
    case 'voice':
      return {
        type: 'voice',
        id: post._id,
        title: title,
        voice_file_id: post.content,
        caption: post.caption,
        caption_entities: post.entities as MessageEntity[],
        parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
      }
  }
  throw new Error('Unsupported post type. Contact admin of the bot')
}

async function handleInlineQuery (ctx: MyContext) {
  const { query, from: { id, language_code } } = ctx.inlineQuery!
  const { inline } = translation[language_code as TranslationKey] || translation.en

  if (query.length > 0) {
    const post = await PostModel.findOne({ unique_id: query })
    if (post) {
      await ctx.answerInlineQuery([generateAnswerFromPost(post, inline.result_title)], {
        cache_time: 0,
        is_personal: true
      })
    } else {
      await ctx.answerInlineQuery([], {
        cache_time: 0,
        is_personal: true,
        switch_pm_text: inline.create_post,
        switch_pm_parameter: 'create_post'
      })
    }
  } else {
    const author = await UserModel.findOne({ telegram_id: id })
    const posts = author ? await PostModel.find({ author: author }) : []
    const results = posts.map(post => generateAnswerFromPost(post, inline.result_title))
    await ctx.answerInlineQuery(results, {
      cache_time: 0,
      is_personal: true,
      switch_pm_text: inline.create_post,
      switch_pm_parameter: 'create_post'
    })
  }

}

async function setup (bot: Composer<MyContext>) {
  bot.on('inline_query', handleInlineQuery)
}

export default { setup }
