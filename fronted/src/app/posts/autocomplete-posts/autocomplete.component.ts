import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Post, PostsService } from '../posts.service';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl('', [Validators.minLength(3)]);
  filteredOptions?: Observable<Post[]>;
  @Input({ required: true }) options!: Post[];

  private postsService = inject(PostsService);

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const filterValue = value || '';
        return filterValue.length >= 3 ? this._filter(filterValue) : [];
      })
    );
  }

  onSelect(event: any) {
    const selectedTitle = event.option.value;
    const selectedPost = this.options.find(
      (option) => option.title === selectedTitle
    );

    if (selectedPost) {
      this.postsService.loadedPosts = [selectedPost];
    } else {
      console.warn(
        'Post não encontrado para o título selecionado:',
        selectedTitle
      );
    }
  }

  onClear() {
    this.myControl.reset();
    this.postsService.getPosts();
  }

  private _filter(value: string): Post[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}
