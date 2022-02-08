import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getResolverData } from 'src/app/common/route-utils';
import { Topic } from 'src/app/models/topic';
import { AppService } from 'src/app/services/app.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.scss']
})
export class ViewTopicComponent implements OnInit {

  acl = []
  editMode = false;
  topic: Topic;
  form: FormGroup;
  constructor(private route: ActivatedRoute,  private formBuilder: FormBuilder, public app: AppService, private backend: GenericService) { }

  ngOnInit(): void {
    this.topic = getResolverData(this.route, 'GET_POSTS');
    this.acl = getResolverData(this.route, 'GET_POSTS', true);
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      content: [''],
      uuid: ['']
    })
  }

  private getPosts() {
    this.backend.operation('GET_POSTS').subscribe(
      r => {
        this.topic = r['items'];
        this.acl = r['acl'];
      }
    );
  }

  createPost() {
    let post = this.form.getRawValue();
    let operation = this.editMode ? 'UPDATE_POST' : 'CREATE_POST';
    this.backend.operation(operation, post).subscribe(
      r => {
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
    this.backend.operation('DELETE_POST', payload).subscribe(
      (r) => {
        if (r) {
          let index = this.topic.posts.indexOf(p);
          this.topic.posts.splice(index, 1);
        }
      }
    )
  }

}
