import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { FullPostComponent } from './posts/full-post/full-post.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'posts/:postId',
    component: FullPostComponent,
  },
  {
    path: 'listPosts',
    component: ListPostsComponent,
  }
]