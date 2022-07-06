import { Composer } from 'grammy'
import { MyPrivateContext } from '../types'
import { start, help, sponsors } from '../library/commands'
import { Router } from '@grammyjs/router'
import { homeText } from './home-step'

async function setup (bot: Composer<MyPrivateContext>) {

  bot.command('start', start)
  bot.command('help', help)
  bot.command('sponsors', sponsors)

  const router = new Router<MyPrivateContext>((ctx) => ctx.session.step)

  const main = router.route('home')
  main.on('message:text', homeText)

  router.otherwise(start)

  bot.use(router)
}

export default { setup }
