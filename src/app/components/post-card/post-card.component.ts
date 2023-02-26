import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Post } from 'src/app/interfaces';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() post: Post | null = null;

  postUrl: string | null = null;

  ngOnInit() {
    this.postUrl = `/post/${this.post?.id}`;
  }
}
