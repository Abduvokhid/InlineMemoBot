import { MyPrivateContext } from '../types'
import { NextFunction } from 'grammy'
import { UserModel } from '../models/User'
import translation, { TranslationKey } from '../translation'

async function userSetup (ctx: MyPrivateContext, next: NextFunction): Promise<void> {
  ctx.session.language = ctx.from?.language_code || 'en'
  ctx.state = {}

  let user = await UserModel.findOne({ telegram_id: ctx.from!.id })
  if (!user) {
    user = new UserModel({ telegram_id: ctx.from!.id })
  }
  user.last_access_date = new Date()
  user.language = ctx.session.language
  await user.save()

  ctx.state.user = user
  ctx.state.translation = translation[user.language as TranslationKey] || translation.en

  await next()
}

export default userSetup
