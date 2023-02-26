import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list.component';
import { PostDetailComponent } from '../post-detail/post-detail.component';

const routes: Routes = [
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', component: PostsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
