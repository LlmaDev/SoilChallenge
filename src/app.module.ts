import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; //arrumar imort


import { FarmModule } from './farm/farm.module';
import { WebsocketModule } from './websocket/websocket.module';
import { PivotModule } from './pivot/pivot.module';
// (já adicionaremos outros módulos como Pivot, PivotStatusHistory mais adiante)

@Module({
  imports: [
    PrismaModule,
    FarmModule,
    WebsocketModule,
    PivotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
