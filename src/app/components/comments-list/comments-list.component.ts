import { Component, Input } from '@angular/core';
import { BlogComment } from 'src/app/interfaces';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css'],
})
export class CommentsListComponent {
  @Input() comments: BlogComment[] = [];
  /**used by Timeago */
  live: Boolean = true;

  trackById(index: number, comment: BlogComment) {
    return comment.id;
  }
}
