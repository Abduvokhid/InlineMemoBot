import { Composer } from 'grammy'
import { MyPrivateContext } from '../types'
import { start, about, sponsors } from '../library/commands'
import { Router } from '@grammyjs/router'
import postStep from './post-step'
import enhanceStep from './enhance-step'

async function setup (bot: Composer<MyPrivateContext>) {

  bot.command('start', start)
  bot.command('about', about)
  bot.command('sponsors', sponsors)

  const router = new Router<MyPrivateContext>((ctx) => ctx.session.step)

  const main = router.route('home')
  main.on('message', postStep)

  const post = router.route('create_post')
  post.on('message', postStep)

  const enhance = router.route('enhance_post')
  enhance.on('message', enhanceStep)

  router.otherwise(start)

  bot.use(router)
}

export default { setup }
