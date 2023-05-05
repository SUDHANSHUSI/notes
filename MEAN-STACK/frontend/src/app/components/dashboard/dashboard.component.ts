import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  post: Post = {
    id: '',
    title: '',
    content: '',
    username: '',
  };
  title: string = '';
  content: string = '';
  username: string = '';

  allPosts: Post[] = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.title = '';
    this.content = '';
    this.username = '';
    this.getAllPost();
  }
  // get all datasubscribe
  getAllPost() {
    this.api.getAllPosts().subscribe(
      (res) => {
        this.allPosts = [res]; // modify this line
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get by ID subscribe
  getPostById(post: Post) {
    this.api.getPostById(post.id).subscribe(
      (res) => {
        post: res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // delete data by id
  deletePostData(post: Post) {
    if (window.confirm('Are You Sure You Want to delete this data' + post.id)) {
      this.api.deletePost(post.id).subscribe(
        (res) => {
          this.allPosts = [];
          this.getAllPost();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  //  create post data subscribe
  createPostData(post: Post) {
    this.api.createPost(post).subscribe(
      (res) => {
        this.allPosts = [];
        this.getAllPost();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // edit data by id
  editPost(post: Post) {
    this.getPostById(post);
    this.title = post.title;
    this.content = post.content;
    this.username = post.username;
  }
  // update data
  updatePost() {
    if (this.title != '' || this.content != '' || this.username != '') {
      alert('please fill all the values on the fields');
      return;
    }
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;

    this.api.updatePost(this.post).subscribe(
      (res) => {
        this.getAllPost();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
