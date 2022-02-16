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
    this.topic = getResolverData(this.route, 'get-one-topic');
    this.acl = getResolverData(this.route, 'get-one-topic', true);
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      content: [''],
      post_uuid: ['']
    })
  }

  private getPosts() {
    this.backend.operation('get-one-topic').subscribe(
      r => {
        this.topic = r['items'];
        this.acl = r['acl'];
      }
    );
  }

  createPost() {
    let post = this.form.getRawValue();
    let operation = this.editMode ? 'update-post' : 'create-post';
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
    this.form.get('post_uuid').setValue(p.uuid);
  }

  removePost(p) {
    let index = this.topic.posts.indexOf(p);
    let payload = { post_uuid: p.uuid, ownerUuid: p.owner.uuid };
    this.backend.operation('delete-post', payload).subscribe(
      (r) => {
        if (r['items']) {
          let index = this.topic.posts.indexOf(p);
          this.topic.posts.splice(index, 1);
        }
      }
    )
  }

}
