import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Post} from './models/post';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
providedIn  : 'root' 
}
)
export class PostsServiceService {
  base_path = 'https://jsonplaceholder.typicode.com/posts';
  data :any;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor( private http : HttpClient) { 
    this.data = [] ; 
  }
    // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  listPosts(): Observable<Post> {
    return this.http.get<Post>(this.base_path)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  listPostsPromise ( ) {
    let promise  = new Promise(( resolve , reject ) =>{
        this.http.get(this.base_path)
        .toPromise()
        .then(
          (res ) =>{
            console.log(res);
            this.data = res;
            resolve( )  
          },
          msg => { 
            reject(msg) ; 
          }
        )
    });
    return promise; 
  }
}