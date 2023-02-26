import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BlogComment } from '../interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  postNewComment(comment: BlogComment) {
    this.socket.emit('user_posted_comment', comment);
  }

  getNewComment() {
    return this.socket.fromEvent('new_comment').pipe(
      map((data: any) => {
        /** expecting a BlogComment object */
        return data;
      })
    );
  }

  getNewPost() {
    return this.socket.fromEvent('new_post').pipe(
      map((data: any) => {
        /**expecting a Post object */
        return data;
      })
    );
  }

  deletedPost() {
    return this.socket.fromEvent('delete_post').pipe(
      map((data: any) => {
        /**expecting a postId number*/
        return data;
      })
    );
  }
}
