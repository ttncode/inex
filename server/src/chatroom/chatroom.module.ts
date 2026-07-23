import { Module } from '@nestjs/common';
import { ChatroomController } from './controller/chatroom.controller';
import { ChatroomService } from './service/chatroom.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatroom, ChatroomSchema } from 'src/schemas/chatroom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatroom.name, schema: ChatroomSchema },
    ]),
  ],
  controllers: [ChatroomController],
  providers: [ChatroomService],
  exports: [ChatroomService],
})
export class ChatroomModule {}
