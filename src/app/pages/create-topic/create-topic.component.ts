import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getResolverData } from 'src/app/common/route-utils';
import { Topic } from 'src/app/models/topic';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {

  form: FormGroup;
  postContent: string = '';
  topic: Topic;
  constructor(private formBuilder: FormBuilder, private backend: GenericService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let path = this.route.routeConfig.path;
    if (path == 'forum/:forum_uuid/criar-topico') this.topic = new Topic();
    else {
      this.topic = getResolverData(this.route, 'get-one-topic');
      this.postContent = this.topic.posts[0].content;
    }
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: [this.topic.name, Validators.required],
      first_post_content: [this.postContent, Validators.required]
    });
  }

  createTopic() {
    let path = this.route.routeConfig.path;
    let operation = path == 'forum/:forum_uuid/criar-topico' ? 'create-topic' : 'update-topic';
    let topic = this.form.getRawValue();
    this.backend.operation(operation, topic).subscribe(
      r => {
        if(r) this.router.navigate(['forum', this.route.snapshot.params['forum_uuid']])
      }
    )
  }

}