import { Component, Input, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum';

@Component({
  selector: 'forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  @Input() forum: Forum;
  constructor() { }

  ngOnInit(): void {
    console.log(this.forum)
  }

}
