import { getModelForClass, prop } from '@typegoose/typegoose'
import { Document } from 'mongoose'

export class User {
  @prop({ required: true })
  public telegram_id!: string

  @prop()
  public language?: string

  @prop()
  public last_access_date?: Date

}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: {
      createdAt: 'created_date',
      updatedAt: false
    },
    versionKey: false,
  }
})

export type UserDocument = User & Document
