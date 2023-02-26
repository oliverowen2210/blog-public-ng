import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
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
  ],
  imports: [
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
