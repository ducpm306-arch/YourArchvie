import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  //@Prop()
  //role;

  @Prop()
  refreshToken: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  //   @Prop()
  //   createdBy: Date;

  //   @Prop()
  //   updatedBy: Date;

  //   @Prop()
  //   deletedBy: Date;
}
