import { Module, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatsRepository } from './chats.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Chat, ChatsSchema } from './entities/chat.entity';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Chat.name, schema: ChatsSchema }]),
    forwardRef(() => MessagesModule),
  ],
  providers: [ChatsResolver, ChatsService, ChatsRepository],
  exports: [ChatsRepository, ChatsService],
})
export class ChatsModule {}
