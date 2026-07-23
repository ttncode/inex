import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  sender: string;
  @IsNotEmpty()
  receiver?: string;
  @IsNotEmpty()
  sendAt: string;
  roomId?: string;
}
