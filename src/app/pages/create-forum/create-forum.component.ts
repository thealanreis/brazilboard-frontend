import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { removeFromArray, removeMultipleFromArray, sortArray } from 'src/app/common/arrayUtils';
import { getResolverData } from 'src/app/common/route-utils';
import { Forum } from 'src/app/models/forum';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { GenericService } from 'src/app/services/generic.service';


@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss']
})
export class CreateForumComponent implements OnInit {

  form: FormGroup;
  roles: Role[]; //Necessário para o acl-table component
  users: User[]; //Auxiliar para o formcontrol users
  moderators: User[] = []; //Auxiliar para o formcontrol moderators
  forum: Forum;
  filteredUsers: Observable<any>; //Necessário para o componente de filtro de usuário

  constructor(private formBuilder: FormBuilder, private backend: GenericService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let path = this.route.snapshot.url[0].path;
    this.users = getResolverData(this.route, 'GET_USERS');
    this.roles = getResolverData(this.route, 'GET_ROLES');

    if (path.startsWith('editar-forum')) {
      this.forum = getResolverData(this.route, 'GET_FORUM');
      this.moderators = this.forum.moderators;
      removeMultipleFromArray(this.users, this.moderators, 'id');
    }
    else {
      this.forum = new Forum();
    }

    this.initializeForm();
    this.filteredUsers = this.form.get('users').valueChanges.pipe(
      startWith(''), map(value => {
        return this.users.filter(user => {
          return user['username'].startsWith(value)
        })
      }
      )
    );
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: [this.forum.name, Validators.required],
      users: [],
      moderators: [this.forum.moderators],
      acls: [this.forum.acls],
    });
  }

  createForum() {
    let path = this.route.snapshot.url[0].path;
    let operation = path.startsWith('editar-forum') ? 'UPDATE_FORUM' : 'CREATE_FORUM'
    let forum = this.form.getRawValue();
    this.backend.operation(operation, forum).subscribe(
      r => console.log(r)
    );
  }

  addModerator(user) {
    removeFromArray(this.users, user, 'id');
    this.moderators.push(user);
    sortArray(this.moderators);
    this.form.get('moderators').setValue(this.moderators);
    this.form.get('users').setValue('');

  }

  removeModerator(moderator) {
    removeFromArray(this.moderators, moderator, 'id');
    this.users.push(moderator);
    sortArray(this.users);
    this.form.get('moderators').setValue(this.moderators);
    this.form.get('users').patchValue('');
  }

  getDisplayName(option) {
    return option ? option['username'] : '';
  }



}
