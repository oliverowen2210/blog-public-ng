import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  blogApiUri: string = environment.BLOG_API_URI;
  postId: number | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = Number(params.get('id'));
    });
  }
}
