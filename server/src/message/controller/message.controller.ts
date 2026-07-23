import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  Get,
} from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { MessageDto } from '../dto/messageDto';
import { Response } from 'express';
import { AddressMessageDto } from '../dto/AddressMessageDto';

@Controller('api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':roomId')
  private async getAllMessageInRoom(
    @Param('roomId') roomId: string,
    @Res() response: Response,
  ) {
    const messageList = await this.messageService.findAllMessageByRoomId(
      roomId,
    );

    return response.status(201).json({
      message: 'Get message in room successfully',
      messageList,
    });
  }

  @Post('/to-shop')
  private async findAllMessageFromUserToShop(
    @Res() response: Response,
    @Body() addressDto: AddressMessageDto,
  ) {
    const messageList = await this.messageService.findAllMessageBySender(
      addressDto,
    );

    return response.status(201).json({
      message: 'Get message in room successfully',
      messageList,
    });
  }

  @Post('')
  private async sendMessage(
    @Res() response: Response,
    @Body() message: MessageDto,
  ) {
    const sendedMessage = await this.messageService.addMessage(message);

    return response
      .status(201)
      .json({ message: 'Message sent successfully', sendedMessage });
  }

  @Delete(':id')
  private async deleteMessage(
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const deletedMessage = await this.messageService.deleteMessage(id);

    return response
      .status(201)
      .json({ message: 'Message is deleted', deletedMessage });
  }
}
