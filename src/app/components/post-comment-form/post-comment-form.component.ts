import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrls: ['./post-comment-form.component.css'],
})
export class PostCommentFormComponent implements OnInit {
  @Input() postId: number | null = null;

  content: string = '';
  contentError: string = '';
  username: string = '';
  submitDisabled: Boolean = false;
  blogApiUri: string = '';

  constructor(private socketService: SocketService) {}

  async submitCommentButtonHandler() {
    this.submitDisabled = true;
    try {
      const axiosResponse = await axios.post(
        `${this.blogApiUri}/posts/${this.postId}/comments/`,
        { username: this.username, text: this.content },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const commentData = axiosResponse.data;
      const comment = commentData.comment;
      this.socketService.postNewComment(comment);
    } catch (err) {
      console.error(err);
    }

    this.content = '';
    this.submitDisabled = false;
  }

  ngOnInit() {
    this.blogApiUri = environment.BLOG_API_URI;
  }
}
