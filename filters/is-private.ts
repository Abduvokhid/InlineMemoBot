import { MyGeneralContext, MyPrivateContext } from '../types'

function isPrivate (
  ctx: MyGeneralContext
): ctx is MyPrivateContext {
  return ctx.chat?.type === 'private'
}

export default isPrivate
