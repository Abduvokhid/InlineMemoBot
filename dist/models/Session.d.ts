import { Document } from 'mongoose';
import { SessionData } from '../types';
declare class Session {
    key: string;
    value: SessionData;
}
export declare const SessionModel: import("@typegoose/typegoose").ReturnModelType<typeof Session, import("@typegoose/typegoose/lib/types").BeAnObject>;
export declare type SessionDocument = Session & Document;
export {};
