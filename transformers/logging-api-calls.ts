import { ApiCallFn, RawApi, Methods, Payload } from 'grammy/out/core/client'
import { AbortSignal } from 'grammy/out/shim.node'
import { ApiResponse } from '@grammyjs/types'
import { logger } from '../utils'

async function loggingApiCalls (
  prev: ApiCallFn,
  method: Methods<RawApi>,
  payload: Payload<Methods<RawApi>, RawApi>,
  signal: AbortSignal | undefined,
): Promise<ApiResponse<any>> {
  logger.debug(`BOT API | ${method} | ${JSON.stringify(payload)}`)
  return prev(method, payload, signal)
}

export default loggingApiCalls
