import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

const routes: Routes = [
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', component: PostsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FormsModule],
})
export class AppRoutingModule {}
