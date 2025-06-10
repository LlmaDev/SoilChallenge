import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // ⚠️ ajuste para frontend real em produção
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  emitPivotUpdate(pivot: any) {
    this.server.emit('pivotUpdate', pivot);
  }
}
