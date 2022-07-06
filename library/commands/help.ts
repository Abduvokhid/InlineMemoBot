import { MyPrivateContext } from '../../types'

async function help(ctx: MyPrivateContext) {
  await ctx.reply('This is help text')
}

export default help
