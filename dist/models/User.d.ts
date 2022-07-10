import { Document } from 'mongoose';
export declare class User {
    telegram_id: string;
    language?: string;
    last_access_date?: Date;
}
export declare const UserModel: import("@typegoose/typegoose").ReturnModelType<typeof User, import("@typegoose/typegoose/lib/types").BeAnObject>;
export declare type UserDocument = User & Document;
