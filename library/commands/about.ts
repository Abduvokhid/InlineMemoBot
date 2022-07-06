import { MyPrivateContext } from '../../types'

async function about(ctx: MyPrivateContext) {
  await ctx.reply('This is about text')
}

export default about
