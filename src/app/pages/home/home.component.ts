import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  forums: Forum[] = [];
  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.operation('GET_FORUMS').subscribe(
        r => this.forums = r['items']
    )
  }

}
