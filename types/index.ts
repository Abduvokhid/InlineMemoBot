import { Context as BaseContext, Api, SessionFlavor, ChatTypeContext } from 'grammy'
import { MessageEntity } from '@grammyjs/types/message'
import { HydrateFlavor, HydrateApiFlavor } from '@grammyjs/hydrate'
import { UserDocument } from '../models/User'
import { Translation } from '../translation'

interface SessionData {
  step: 'home' | 'create_post' | 'enhance_post',
  language?: string,
  post?: Post,
}

interface State {
  user?: UserDocument,
  translation?: Translation,
}

type MyContext = BaseContext & HydrateFlavor<BaseContext> & SessionFlavor<SessionData>
type MyApi = HydrateApiFlavor<Api>

type MyPrivateContext = MyContext & ChatTypeContext<MyContext, 'private'> & { state: State }

export type Post = {
  preview_id?: string,
  settings_id?: string,
  type: 'text' | 'animation' | 'audio' | 'document' | 'photo' | 'video' | 'voice'
  content: string,
  disable_preview?: boolean,
  caption?: string,
  entities?: MessageEntity[]
}

export { SessionData, MyContext, MyApi, MyPrivateContext }
