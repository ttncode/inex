import { Module } from '@nestjs/common';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MessageController } from './controller/message.controller';
import { MessageService } from './service/message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatroomModule } from 'src/chatroom/chatroom.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ChatroomModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
