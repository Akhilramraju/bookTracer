import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';
import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { oldBook } from "app/models/oldBook";
import { map, tap } from "rxjs/operators";
// import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {

    return allReaders;
  }

  getReaderById(id: number): Reader {

    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    // Book[] {

    console.log('Getting all books from the server: ');
    return this.http.get<Book[]>('/api/books');
    // return allBooks;
  }

  getBookById(id: number): Observable<Book> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'
    });

    console.log('book printed as:' + id);
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: getHeaders
    });

    // return allBooks.find(book => book.bookID === id);
  }
  getOldBookByid(id: number): Observable<oldBook> {
    return this.http.get<oldBook>(`a/api/books/${id}`);
  }
}
