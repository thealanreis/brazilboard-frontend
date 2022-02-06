import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {

  form: FormGroup;
  postContent: string = '';
  topic: Topic;
  constructor(private formBuilder: FormBuilder, private topicService: TopicService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let path = this.route.routeConfig.path;
    if (path == 'forum/:fuuid/criar-topico') this.topic = new Topic();
    else {
      this.topic = this.route.snapshot.data['r']['items'];
      this.postContent = this.topic.posts[0].content;
    }
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: [this.topic.name, Validators.required],
      content: [this.postContent, Validators.required]
    });
  }

  createTopic() {
    let path = this.route.routeConfig.path;
    let operation = path == 'forum/:fuuid/criar-topico' ? 'CREATE_TOPIC' : 'UPDATE_TOPIC';
    let topic = this.form.getRawValue();
    this.topicService.operation(operation, topic).subscribe(
      r => console.log(r)
    )
  }

}