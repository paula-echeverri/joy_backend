import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';



export type UserDocument = User & Document;
// @Schema({
//   timestamps: {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//   },
// })

@Schema()
export class User  {
  @ApiProperty()
  @Prop({ required: true })
  username: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  password: string;

  // @ApiProperty()
  // @Prop()
  // created_at: Date;

  // @ApiProperty()
  // @Prop()
  // updated_at: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
