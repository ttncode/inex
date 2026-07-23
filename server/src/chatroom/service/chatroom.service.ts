import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chatroom } from 'src/schemas/chatroom.schema';
import { ChatroomDto } from '../dto/ChatroomDto';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectModel(Chatroom.name) private chatroomModel: Model<Chatroom>,
  ) {}

  public async findByRoomId(roomId: string): Promise<Chatroom> {
    const chatroom = await this.chatroomModel.findById(roomId);
    return chatroom;
  }

  public async findAllChatroomByEmail(email: string): Promise<Chatroom[]> {
    const chatroomList = await this.chatroomModel.find({
      members: { $in: email },
    });
    return chatroomList;
  }

  public async createChatroom(chatroomDto: ChatroomDto): Promise<Chatroom> {
    const createdChatroom = new this.chatroomModel(chatroomDto);
    await createdChatroom.save();

    return createdChatroom;
  }

  public async addMemberToRoom(
    roomId: string,
    newMembers: string[],
  ): Promise<string[]> {
    const room = await this.chatroomModel.findById(roomId);
    if (!room) throw new Error('Room not found');

    room.members.push(...newMembers);
    const updatedRoom = await room.save();

    return updatedRoom.members;
  }
}
