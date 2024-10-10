import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subscription } from 'rxjs';

export interface Post {
  id: string;
  title: string;
  views: number;
  imagePath: string;
}

export interface Commentary {
  id: string;
  text: string;
  postId?: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  loadedPosts: Post[] = [];
  loadedComments: Commentary[] = [];
  constructor(private http: HttpClient) {}
 
  getPosts(): void {
    this.http
      .get<{ [key: string]: Post }>('http://localhost:3000/posts')
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key] });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        console.log(posts);
        this.loadedPosts = posts;
      });
  }

  getPost(postId: string) {
    return this.loadedPosts.filter((post) => post.id === postId);
  }

  getComments(postId: string): void {
    this.http
      .get<{ [key: string]: Commentary }>(`http://localhost:3000/comments?postId=${postId}`)
      .pipe(
        map((responseData) => {
          const commentsArray: Commentary[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              commentsArray.push({ ...responseData[key] });
            }
          }
          return commentsArray;
        })
      )
      .subscribe(comments => {
        console.log(comments);
        this.loadedComments = comments;
      });
  }
}
