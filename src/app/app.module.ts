import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PostCardComponent } from './components/post-card/post-card.component';
@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    PostsListComponent,
    LayoutComponent,
    PostCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
