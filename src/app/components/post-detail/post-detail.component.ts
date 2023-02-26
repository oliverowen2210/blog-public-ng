import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import axios, { AxiosError } from 'axios';
import { SocketService } from 'src/app/services/socket.service';

import { Post, BlogComment } from 'src/app/interfaces';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.socketService.getNewComment().subscribe((comment: BlogComment) => {
      comment.isNew = true;
      console.log('new comment');
      this.comments.unshift(comment);
    });
  }

  private blogApiUri: string = environment.BLOG_API_URI;
  postId: number | null = null;
  post: Post | null = null;
  errorMessage: string | null = null;
  comments: BlogComment[] = [];
  sanitizedPostText: SafeHtml | null = null;

  ngOnInit() {
    /**get post and comments */
    const getComments = async (id: number | null) => {
      try {
        const axiosResponse = await axios.get(
          `${this.blogApiUri}/posts/${id}/comments`
        );
        return axiosResponse.data;
      } catch (err) {
        return err;
      }
    };

    const getPost = async (id: number | null) => {
      if (!id) return;
      try {
        const axiosResponse = await axios.get(`${this.blogApiUri}/posts/${id}`);
        return axiosResponse.data;
      } catch (err) {
        return err;
      }
    };

    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.postId = Number(params.get('id'));
      const post = await getPost(this.postId);
      if (post instanceof AxiosError) {
        if (post.response?.status === 404) {
          this.errorMessage = 'No post with that ID was found.';
        } else {
          this.errorMessage = 'Error getting post.';
          console.error(post);
        }
      }
      const comments = await getComments(this.postId);
      this.post = post;
      this.comments = comments;
      this.sanitizedPostText = this.sanitizer.bypassSecurityTrustHtml(
        post.text
      );
    });
  }
}
