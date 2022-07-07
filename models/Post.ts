import { getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose'
import mongoose, { Document } from 'mongoose'
import { User } from './User'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Post {
  @prop({ required: true, unique: true, index: true })
  public unique_id!: string

  @prop({ required: true, ref: () => User })
  public author!: Ref<User>

  @prop({ required: true, enum: ['text', 'animation', 'audio', 'document', 'photo', 'video', 'voice'] })
  public type!: string

  @prop({ required: true })
  public content!: string

  @prop()
  public disable_preview?: boolean

  @prop()
  public caption?: string

  @prop({ type: mongoose.Schema.Types.Mixed })
  public entities?: object[]

}

export const PostModel = getModelForClass(Post, {
  schemaOptions: {
    timestamps: {
      createdAt: 'created_date',
      updatedAt: false
    },
    versionKey: false,
  }
})

export type PostDocument = Post & Document
