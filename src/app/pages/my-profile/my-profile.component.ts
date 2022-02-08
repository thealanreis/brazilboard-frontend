import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { editorConfig } from 'src/app/common/angular-editor-config';
import { getResolverData } from 'src/app/common/route-utils';
import { User } from 'src/app/models/user';
import { GenericService } from 'src/app/services/generic.service';


@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  config = editorConfig;
  form: FormGroup;
  user: User;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private backend: GenericService) { }

  ngOnInit(): void {
    this.user = getResolverData(this.route, 'GET_MY_USER');
    this.initializeForm();
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.email],
      signature: [this.user.signature, ]
    });
  }

  saveMyProfile(){
    let myprofile = this.form.getRawValue();
    this.backend.operation('update_my_user', myprofile).subscribe(
      r => console.log(r)
    )
  }

}