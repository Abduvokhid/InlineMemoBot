import { MyPrivateContext } from '../../types'

async function sponsors (ctx: MyPrivateContext) {
  const { sections: { sponsors } } = ctx.state.translation!

  const list = sponsors.list.map((sponsor, index) => `${index + 1}. <b><a href="${sponsor.link}">${sponsor.name}</a></b>\n`)
  const message = `${sponsors.content}\n${list}`

  await ctx.reply(message, { disable_web_page_preview: true })
}

export default sponsors
