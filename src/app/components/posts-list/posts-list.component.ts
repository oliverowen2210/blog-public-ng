import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';

import { Post } from '../../interfaces';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  errorMessage: unknown = null;
  posts: Post[] = [];
  private blogApiUri: string = environment.BLOG_API_URI;

  constructor(private socketService: SocketService) {}

  trackById(index: number, post: Post) {
    return post.id;
  }

  ngOnInit() {
    /** create socket connection */
    this.socketService.getNewPost().subscribe((post: Post) => {
      post.isNew = true;
      this.posts.unshift(post);
    });

    this.socketService.deletedPost().subscribe((postId: number) => {
      let newPosts: Post[] = [];
      for (let i = 0; i < this.posts.length; i++) {
        let currentPost = this.posts[i];
        if (currentPost.id !== postId) {
          newPosts.push(currentPost);
        }
      }
      this.posts = newPosts;
    });

    /** get posts */
    const url = `${this.blogApiUri}/posts`;
    const fetchData = async () => {
      const response = await axios.get(url);
      this.posts = response.data;
    };

    try {
      fetchData();
    } catch (err: unknown) {
      this.errorMessage = err instanceof Error ? err.message : 'Unknown error.';
      return this.errorMessage;
    }
  }
}
