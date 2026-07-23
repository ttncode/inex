import { IsNotEmpty } from 'class-validator';

export class MessageInfoDto {
  @IsNotEmpty()
  channel: string;
  @IsNotEmpty()
  event: string;
  @IsNotEmpty()
  message: string;
}
