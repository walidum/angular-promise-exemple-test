import { Component, Input, OnInit } from '@angular/core';
import {PostsServiceService } from './posts-service.service';
import { Post } from '../model/post';
@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit  {
  @Input() name: string;
  posts : any ;
   constructor (public api : PostsServiceService ) {
   }
  ngOnInit ( ) {
     this.getAllPosts();
  }
getAllPosts() {
    //Get saved list of students
    this.api.listPostsPromise().then(response => { 
      this.posts = this.api.data;
      console.log(this.posts);
    })
  }
}
