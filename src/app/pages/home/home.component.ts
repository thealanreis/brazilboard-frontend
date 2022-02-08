import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getResolverData } from 'src/app/common/route-utils';
import { Forum } from 'src/app/models/forum';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  forums: Forum[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forums = getResolverData(this.route, 'GET_FORUMS');
  }

}
