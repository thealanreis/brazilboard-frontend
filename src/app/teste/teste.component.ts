import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from '../services/generic.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private svc: GenericService) { }

  msg = '';
  ngOnInit(): void {
    this.msg = this.route.snapshot.data['TESTE'];
    
  }

}
