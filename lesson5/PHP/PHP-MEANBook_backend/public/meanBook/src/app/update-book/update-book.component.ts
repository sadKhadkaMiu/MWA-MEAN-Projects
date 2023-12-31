import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksDataService } from '../books-data.service';
import { Book } from '../book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  updateBookForm!: FormGroup;
  book!: Book;

  constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _bookDataService: BooksDataService, private _router: Router) { }

  ngOnInit(): void {
    const bookId = this._route.snapshot.params['bookId'];
    this._bookDataService.getBook(bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.updateBookForm = this._formBuilder.group({
          title: [book.title],
          noOfPages: [book.noOfPages],
          year: [book.year],
          publisherName: [book.publisherName]
        })
      },
      error: () => {
        console.log("error finding book to update");

      }
    })

    this.updateBookForm = this._formBuilder.group({
      title: [''],
      noOfPages: [''],
      year: [''],
      publisherName: ['']
    });
  }
  ;

  onUpdateBookFormSubmit(): void {
    if (this.updateBookForm) {
      const bookId = this._route.snapshot.params['bookId'];
      const updatedbookfromForm = this.updateBookForm.value;
      const updatedBook = new Book("", updatedbookfromForm.title, updatedbookfromForm.year, updatedbookfromForm.publisherName, updatedbookfromForm.noOfPages, this.book.authors);
      this._bookDataService.updateBook(bookId, updatedBook).subscribe({
        next: (book) => {
          // console.log(book);
          this._router.navigate(['/book/' + bookId]);
        },
        error: () => {
          "error updating book"
        }
      })



    }

  }
}
