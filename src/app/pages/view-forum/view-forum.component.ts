import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.forum = this.route.snapshot.data['r']['items'];
    this.acl = this.route.snapshot.data['r']['acl'];
  }

}
