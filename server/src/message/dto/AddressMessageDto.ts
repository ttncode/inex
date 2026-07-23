import { IsNotEmpty } from 'class-validator';

export class AddressMessageDto {
  @IsNotEmpty()
  sender: string;
  @IsNotEmpty()
  receiver?: string;
}
