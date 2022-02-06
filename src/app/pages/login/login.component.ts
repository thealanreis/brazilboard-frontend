import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formRegister : FormGroup;
  formLogin : FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private app: AppService) { }

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
    this.userService.operation('REGISTER', user).subscribe(
      r => console.log(r)
    )
  }

  login(){
    let user = this.formLogin.getRawValue();
    this.userService.operation('LOGIN', user).subscribe(
      r => {
        if(r) this.app.user = r['items']
      }
    )
  }

}
