import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getResolverData } from 'src/app/common/route-utils';
import { Forum } from 'src/app/models/forum';
import { Topic } from 'src/app/models/topic';
import { AppService } from 'src/app/services/app.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.scss']
})
export class ViewForumComponent implements OnInit {

  forum: Forum;
  acl = [];
  constructor(private route: ActivatedRoute, public app: AppService, private svc: GenericService) { }

  ngOnInit(): void {
    this.forum = getResolverData(this.route, 'get-one-forum');
    this.acl = getResolverData(this.route, 'get-one-forum', true);
  }

  removeTopic(t: Topic){
    this.svc.operation('delete-topic', {'topic_uuid' : t.uuid}).subscribe(
      r => console.log(r)
    )
  }

}
