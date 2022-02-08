import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formRegister : FormGroup;
  formLogin : FormGroup;
  constructor(private formBuilder: FormBuilder, private backend: GenericService, private app: AppService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.formRegister = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required]
    });

    this.formLogin = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  registerUser(){
    let user = this.formRegister.getRawValue();
    this.backend.operation('REGISTER', user).subscribe(
      r => {if(r)this.dialog.closeAll()}
    )
  }

  login(){
    let user = this.formLogin.getRawValue();
    this.backend.operation('LOGIN', user).subscribe(
      r => {
        if(r) this.app.user = r['items'];
        this.dialog.closeAll();
      }
    )
  }

}
