import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONT_URL : '*',
  },
})
export class PostsGateway {
  @WebSocketServer()
  server: Server;

  emitNewPost(post: any) {
    this.server.emit('new-post', post);
  }
}
