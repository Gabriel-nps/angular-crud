import { Component, inject } from '@angular/core';
import { PostsService } from './posts.service';
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  private postsService = inject(PostsService);

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.postsService.getPosts();
  }

  get allPosts() {
    return this.postsService.loadedPosts;
  }
}
