import { ApiCallFn, RawApi, Methods, Payload } from 'grammy/out/core/client';
import { AbortSignal } from 'grammy/out/shim.node';
import { ApiResponse } from '@grammyjs/types';
declare function loggingApiCalls(prev: ApiCallFn, method: Methods<RawApi>, payload: Payload<Methods<RawApi>, RawApi>, signal: AbortSignal | undefined): Promise<ApiResponse<any>>;
export default loggingApiCalls;
