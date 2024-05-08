import { Module, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatsRepository } from './chats.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { MessagesModule } from './messages/messages.module';
import { ChatDocument, ChatSchema } from './entities/chat.document';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: ChatDocument.name, schema: ChatSchema },
    ]),
    forwardRef(() => MessagesModule),
  ],
  providers: [ChatsResolver, ChatsService, ChatsRepository],
  exports: [ChatsRepository],
})
export class ChatsModule {}
