import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getResolverData } from 'src/app/common/route-utils';
import { Forum } from 'src/app/models/forum';

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
    this.forum = getResolverData(this.route, 'GET_TOPICS');
    this.acl = getResolverData(this.route, 'GET_TOPICS', true);
  }

}
