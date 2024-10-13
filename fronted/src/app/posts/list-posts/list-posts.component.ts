import { Component, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PostsService } from '../posts.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteComponent } from "../autocomplete-posts/autocomplete.component";

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatIconModule, MatFormFieldModule, MatInputModule, AutocompleteComponent],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss'
})
export class ListPostsComponent {
  private postsService = inject(PostsService);

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.postsService.getPosts();
  }

  get allPosts() {
    return this.postsService.loadedPosts;
  }

  displayedColumns: string[] = ['id', 'title', 'views', 'imagePath', 'actions'];
}
