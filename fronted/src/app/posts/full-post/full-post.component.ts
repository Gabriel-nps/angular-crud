import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { PostComponent } from "../post/post.component";
import { Post, PostsService } from '../posts.service';

@Component({
  selector: 'app-full-post',
  standalone: true,
  imports: [PostComponent, MatCardModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './full-post.component.html',
  styleUrl: './full-post.component.scss'
})
export class FullPostComponent {
  post?: Post = undefined;

  private postsService = inject(PostsService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  get comments() {
    return this.postsService.loadedComments;
  }

  ngOnInit(): void {
    console.log(this.activatedRoute);

    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const paramPostId = paramMap.get('postId');
        this.postsService.getComments(paramPostId!);
        this.post = this.postsService.loadedPosts.find(post => post.id === paramPostId);
      }
    })
    
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
    
  }
}
