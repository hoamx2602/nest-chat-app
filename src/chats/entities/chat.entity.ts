import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
@Schema()
export class Chat extends AbstractEntity {
  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  isPrivate: boolean;

  @Field({ nullable: true })
  @Prop([String])
  name?: string;

  @Field(() => [String])
  @Prop()
  userIds: string[];
}

export const ChatsSchema = SchemaFactory.createForClass(Chat);
