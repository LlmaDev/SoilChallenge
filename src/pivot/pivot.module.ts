import { Module } from '@nestjs/common';
import { PivotService } from './pivot.service';
import { PivotController } from './pivot.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [PrismaModule, WebsocketModule],
  controllers: [PivotController],
  providers: [PivotService],
})
export class PivotModule {}
