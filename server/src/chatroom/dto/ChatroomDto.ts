import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChatroomDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  members: string[];

  @IsEmail()
  @IsNotEmpty()
  createdBy: string;
}
