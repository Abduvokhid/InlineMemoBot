import { Ref } from '@typegoose/typegoose';
import { Document } from 'mongoose';
import { User } from './User';
import { Button } from '../types';
declare class Post {
    unique_id: string;
    author: Ref<User>;
    type: string;
    content: string;
    disable_preview?: boolean;
    caption?: string;
    entities?: object[];
    buttons: Button[][];
}
export declare const PostModel: import("@typegoose/typegoose").ReturnModelType<typeof Post, import("@typegoose/typegoose/lib/types").BeAnObject>;
export declare type PostDocument = Post & Document;
export {};
