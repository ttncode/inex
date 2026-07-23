import { MessageInfoDto } from './dto/messageInfoDto';
import { PusherService } from './pusher.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/pusher')
export class PusherController {
  constructor(private readonly pusherService: PusherService) {}

  @Post('')
  messages(@Body() messageInfo: MessageInfoDto) {
    this.pusherService.trigger('chat-box', 'chat', messageInfo);
  }
}
