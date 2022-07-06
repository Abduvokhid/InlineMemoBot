import { Context as BaseContext, Api, SessionFlavor, ChatTypeContext } from 'grammy'
import { HydrateFlavor, HydrateApiFlavor } from '@grammyjs/hydrate'
import { UserDocument } from '../models/User'
import { Translation } from '../translation'

interface SessionData {
  step: 'home' | 'create_post',
  language?: string
}

interface State {
  user?: UserDocument,
  translation?: Translation,
}

type MyContext = BaseContext & HydrateFlavor<BaseContext> & SessionFlavor<SessionData>
type MyApi = HydrateApiFlavor<Api>

type MyPrivateContext = MyContext & ChatTypeContext<MyContext, "private"> & { state: State }

export { SessionData, MyContext, MyApi, MyPrivateContext }
