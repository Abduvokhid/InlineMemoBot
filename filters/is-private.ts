import { MyContext, MyPrivateContext } from '../types'

function isPrivate (
  ctx: MyContext
): ctx is MyPrivateContext {
  return ctx.chat?.type === 'private'
}

export default isPrivate
