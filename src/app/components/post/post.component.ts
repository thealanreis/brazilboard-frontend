import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { AppService } from 'src/app/services/app.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  form: FormGroup;
  @Input() post: Post;

  constructor(private formBuilder: FormBuilder, private postService: PostService, public app: AppService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      content: [this.post.content, Validators.required],
      uuid: [this.post.uuid]
    })
  }



}
