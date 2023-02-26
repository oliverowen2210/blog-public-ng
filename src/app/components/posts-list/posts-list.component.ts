import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import socket from '../../../socket';

interface Post {
  id: number;
  isNew?: boolean;
}

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  errorMessage: unknown = null;
  posts: Post[] = [];
  private blogApiUri: string = environment.BLOG_API_URI;

  trackById(index: number, post: Post) {
    return post.id;
  }

  ngOnInit() {
    /** create socket connection */
    socket.on('new_post', (post: Post) => {
      post.isNew = true;
      this.posts?.unshift(post);
    });

    socket.on('delete_post', (postId: number) => {
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

  ngOnDestroy() {
    socket.off('new_post');
    socket.off('delete_post');
  }
}
