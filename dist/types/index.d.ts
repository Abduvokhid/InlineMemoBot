import { Context as BaseContext, Api, SessionFlavor, ChatTypeContext } from 'grammy';
import { MessageEntity } from '@grammyjs/types/message';
import { HydrateFlavor, HydrateApiFlavor } from '@grammyjs/hydrate';
import { UserDocument } from '../models/User';
import { Translation } from '../translation';
interface SessionData {
    step: 'home' | 'create_post' | 'enhance_post';
    language?: string;
    current_id?: string;
    post?: Post;
    credentials?: {
        token: string;
        valid_until: Date;
    };
}
interface Button {
    type: 'link' | 'message_box' | 'share' | 'share_post';
    name: string;
    link?: string;
    message?: string;
}
interface State {
    user?: UserDocument;
    translation?: Translation;
}
declare type MyGeneralContext = BaseContext & HydrateFlavor<BaseContext>;
declare type MyContext = MyGeneralContext & SessionFlavor<SessionData> & {
    state: State;
};
declare type MyApi = HydrateApiFlavor<Api>;
declare type MyPrivateContext = MyContext & ChatTypeContext<MyContext, 'private'>;
export declare type Post = {
    preview_id?: string;
    settings_id?: string;
    type: 'text' | 'animation' | 'audio' | 'document' | 'photo' | 'video' | 'voice';
    content: string;
    disable_preview?: boolean;
    caption?: string;
    entities?: MessageEntity[];
    buttons: Button[][];
};
export { SessionData, MyContext, MyApi, MyPrivateContext, MyGeneralContext, Button };
