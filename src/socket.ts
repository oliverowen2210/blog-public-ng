import { io, Socket } from 'socket.io-client';
import { environment } from './environments/environment';

const socket: Socket = io(environment.BLOG_API_URI, {});
export default socket;
