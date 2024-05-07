import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPrivate: boolean;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  userIds?: string[];
}
