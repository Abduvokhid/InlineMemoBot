import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose'
import mongoose, { Document } from 'mongoose'
import { SessionData } from '../types'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Session {
  @prop({ required: true, unique: true, index: true })
  public key!: string

  @prop({ required: true, type: mongoose.Schema.Types.Mixed })
  public value!: SessionData

}

export const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: false,
    versionKey: false,
  }
})

export type SessionDocument = Session & Document
