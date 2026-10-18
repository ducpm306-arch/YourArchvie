import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type DocumentDocument = mongoose.HydratedDocument<Document>;

@Schema()
export class Document {
  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  normalizedUrl: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  })
  tag: mongoose.Types.ObjectId | null;

  @Prop()
  thumbail: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  })
  project: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null,
  })
  folder: mongoose.Types.ObjectId | null;

  @Prop({
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
  })
  status: string;

  @Prop({
    type: [
      {
        status: {
          type: String,
          enum: ['PENDING', 'APPROVED', 'REJECTED'],
        },
        updatedAt: { type: Date },
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  })
  history: {
    status: string;
    updatedAt: Date;
    updatedBy: mongoose.Types.ObjectId;
  }[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  createdBy: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  updatedBy: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  deletedBy: mongoose.Types.ObjectId;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
