import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000/post';
  constructor(private http: HttpClient) {}
  // get all post data
  getAllPosts(): Observable<Post> {
    return this.http.get<Post>(this.url);
  }

  //  get post data by id
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(this.url + '/' + id);
  }

  //Delete post data by id
  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(this.url + '/' + id);
  }
  //Update post data by id
  updatePost(post: Post): Observable<Post> {
    return this.http.patch<Post>(this.url + '/' + post.id, post);
  }

  // create post
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }
}
