import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PermissionDocument = mongoose.HydratedDocument<Permission>;

@Schema()
export class Permission {
  @Prop()
  name: string;

  @Prop()
  path: string;

  @Prop()
  method: string;

  @Prop()
  module: string;

  @Prop()
  description: string;

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

export const PermissionSchema = SchemaFactory.createForClass(Permission);
