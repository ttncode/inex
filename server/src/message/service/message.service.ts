import { MessageDto } from './../dto/messageDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatroomService } from 'src/chatroom/service/chatroom.service';
import { Message } from 'src/schemas/message.schema';
import { AddressMessageDto } from '../dto/AddressMessageDto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private readonly chatroomService: ChatroomService,
  ) {}

  public async findAllMessageByRoomId(roomId: string): Promise<Message[]> {
    const messageList = await this.messageModel.find({ roomId });
    return messageList;
  }

  public async findAllMessageBySender(
    addressDto: AddressMessageDto,
  ): Promise<Message[]> {
    const messageList = await this.messageModel.find({
      $or: [{ sender: addressDto.sender }, { receiver: addressDto.receiver }],
    });
    return messageList;
  }

  public async addMessage(message: MessageDto): Promise<Message> {
    try {
      let roomDB;

      if (message.roomId) {
        roomDB = await this.chatroomService.findByRoomId(message.roomId);
      } else {
        roomDB = await this.chatroomService.createChatroom({
          name: message.receiver,
          members: [message.sender, message.receiver],
          createdBy: message.sender,
        });
      }

      const newMessage = new this.messageModel({
        content: message.content,
        sender: message.sender,
        receiver: roomDB.members.filter((member) => member !== message.sender),
        sendAt: message.sendAt,
        roomId: roomDB._id,
      });
      await newMessage.save();

      return newMessage;
    } catch (error) {
      console.error('Save message failed:', error);
      throw new HttpException(
        'Save message failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteMessage(messageId: string) {
    try {
      await this.messageModel.findByIdAndDelete(messageId);
    } catch (error) {
      throw new HttpException(
        'Delete message failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
