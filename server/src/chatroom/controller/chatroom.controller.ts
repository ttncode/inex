import { Response } from 'express';
import { Body, Controller, Post, Res, Param, Get } from '@nestjs/common';
import { ChatroomService } from '../service/chatroom.service';
import { ChatroomDto } from '../dto/ChatroomDto';

@Controller('api/chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Get(':email')
  private async getAllChatroom(
    @Param('email') email: string,
    @Res() response: Response,
  ) {
    const chatroomList = await this.chatroomService.findAllChatroomByEmail(
      email,
    );
    return response.status(201).json({
      message: 'Get chat room successfully',
      chatroomList,
    });
  }

  @Post('create')
  private async createChatroom(
    @Res() response: Response,
    @Body() chatroomDto: ChatroomDto,
  ) {
    const createdChatroom = await this.chatroomService.createChatroom(
      chatroomDto,
    );
    return response.status(201).json({
      message: 'Chat room has been successfully created',
      createdChatroom,
    });
  }

  @Post(':roomId/add-member')
  private async addMember(
    @Param('roomId') roomId: string,
    @Res() response: Response,
    @Body() members: string[],
  ) {
    const memberList = await this.chatroomService.addMemberToRoom(
      roomId,
      members,
    );
    return response.status(201).json({
      message: 'Members has been successfully added',
      memberList,
    });
  }
}
