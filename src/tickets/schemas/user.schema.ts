import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;

  // @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  roleType: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Role' })
  roleId: string;

  @Prop({ required: true })
  contactNo: string;

  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  state: string;
  @Prop({ type: [Types.ObjectId], default: [] })
  rm: Types.ObjectId[];

  @Prop({ default: false })
  isWildCardLoginAccess: boolean;
  @Prop({ required: true })
  userType: string;

  // @Prop({ required: true, unique: true })
  // employeeId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
