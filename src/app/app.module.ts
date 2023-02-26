import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { TimeagoModule } from 'ngx-timeago';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import {
  CommentsListComponent,
  LayoutComponent,
  PostCardComponent,
  PostCommentFormComponent,
  PostDetailComponent,
  PostsListComponent,
} from './components';

import { environment } from 'src/environments/environment';

const socketConfig: SocketIoConfig = {
  url: environment.BLOG_API_URI,
  options: {
    transports: ['websocket'],
  },
};

@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    PostsListComponent,
    LayoutComponent,
    PostCardComponent,
    PostCommentFormComponent,
    CommentsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TimeagoModule.forRoot(),
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
