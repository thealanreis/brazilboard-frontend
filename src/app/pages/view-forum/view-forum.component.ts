import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forum } from 'src/app/models/forum';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.scss']
})
export class ViewForumComponent implements OnInit {

  forum: Forum;
  acl = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forum = this.route.snapshot.data['r']['items'];
    this.acl = this.route.snapshot.data['r']['acl'];
    // this.topicService.operation('GET_TOPICS', null).subscribe(
    //   r => {
    //     if (r) {
    //       this.forum = r['items'];
    //       this.topics = r['items']['topics']
    //     }
    //   }
    // )
  }

}
