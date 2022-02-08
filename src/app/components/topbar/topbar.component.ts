import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AppService } from 'src/app/services/app.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private dialog: MatDialog, public app: AppService, private backend: GenericService, private router: Router) { }

  ngOnInit(): void { }

  openLogin() {
    this.dialog.open(LoginComponent);
  }

  logout() {
    this.backend.operation('logout').subscribe(
      r => {
        if (r) {
          this.app.user = null;
          this.router.navigate(['']);
        }
      }
    )
  }

}
