import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { AppService } from 'src/app/services/app.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.scss']
})
export class ViewTopicComponent implements OnInit {

  acl = []
  editMode = false;
  topic: Topic;
  newPost: string;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder, public app: AppService) { }

  ngOnInit(): void {
    this.topic = this.route.snapshot.data['r']['items'];
    this.acl = this.route.snapshot.data['r']['acl'];
      this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      content: [''],
      uuid: ['']
    })
  }

  private getPosts() {
    this.postService.operation('GET_POSTS').subscribe(
      r => {
        this.topic = r['items'];
        this.acl = r['acl'];
      }
    );
    console.log(this.app.user);
  }

  createPost() {
    let post = this.form.getRawValue();
    let operation = this.editMode ? 'UPDATE_POST' : 'CREATE_POST';
    this.postService.operation(operation, post).subscribe(
      r => {
        console.log(r);
        this.form.get('content').setValue('');
        this.getPosts();
      }
    )
  }


  editPost(p) {
    this.editMode = true;
    this.form.get('content').setValue(p.content);
    this.form.get('uuid').setValue(p.uuid);
  }

  removePost(p) {
    let index = this.topic.posts.indexOf(p);
    console.log(index);
    let payload = { uuid: p.uuid, ownerUuid: p.owner.uuid };
    this.postService.operation('DELETE_POST', payload).subscribe(
      (r) => {
        if (r) {
          let index = this.topic.posts.indexOf(p);
          this.topic.posts.splice(index, 1);
        }
      }
    )
  }

  savePost() {
    // this.editMode = false;
    // this.postService.operation('UPDATE_POST', this.form.getRawValue()).subscribe(
    //   r => { this.post.content = r['content'] }
    // )
  }

}
