import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { removeFromArray, removeMultipleFromArray, sortArray } from 'src/app/common/arrayUtils';
import { Forum } from 'src/app/models/forum';
import { ForumACL } from 'src/app/models/forum-acl';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { ForumService } from 'src/app/services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss']
})
export class CreateForumComponent implements OnInit {

  form: FormGroup;
  roles: Role[];
  users: User[];
  moderators: User[] = [];
  forum: Forum;
  filteredUsers: Observable<any>;



  constructor(private formBuilder: FormBuilder, private forumService: ForumService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let path = this.route.snapshot.url[0].path;
    this.users = this.route.snapshot.data['r'][0]['items'];
    this.roles = this.route.snapshot.data['r'][1]['items'];

    if (path.startsWith('editar-forum')) {
      this.forum = this.route.snapshot.data['r'][2]['items'];
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

    // if (this.forum.uuid) {
    //   let fg = this.formBuilder.group({});

      
    //   for (var i = 0; i < this.roles.length; i++) {
    //     let fa = this.formBuilder.group({});
    //     let acl = this.forum.acls[i];
    //     fa.addControl('read_topic', new FormControl(acl['read_topic']));
    //     fa.addControl('write_topic', new FormControl(acl['write_topic']));
    //     fa.addControl('edit_topic', new FormControl(acl['edit_topic']));
    //     fa.addControl('delete_topic', new FormControl(acl['delete_topic']));
    //     fa.addControl('write_post', new FormControl(acl['write_post']));
    //     fa.addControl('edit_post', new FormControl(acl['edit_post']));
    //     fa.addControl('delete_post', new FormControl(acl['delete_post']));
    //     fa.addControl('id', new FormControl(acl['id']));
    //     // fa.addControl('write_pool', new FormControl(false));
    //     // fa.addControl('edit_pool', new FormControl(false));
    //     // fa.addControl('delete_pool', new FormControl(false));
    //     fg.addControl(this.roles[i].id, fa);
    //   }

    //   this.form.addControl('permissions', fg);
    //   console.log('FORM', this.form);

    // }
    // else {
    //   let fg = this.formBuilder.group({});
    //   this.roles.forEach(
    //     role => {
    //       let fa = this.formBuilder.group({});
    //       fa.addControl('read_topic', new FormControl(true));
    //       fa.addControl('write_topic', new FormControl(false));
    //       fa.addControl('edit_topic', new FormControl(false));
    //       fa.addControl('delete_topic', new FormControl(false));
    //       fa.addControl('write_post', new FormControl(true));
    //       fa.addControl('edit_post', new FormControl(false));
    //       fa.addControl('delete_post', new FormControl(false));
    //       // fa.addControl('write_pool', new FormControl(false));
    //       // fa.addControl('edit_pool', new FormControl(false));
    //       // fa.addControl('delete_pool', new FormControl(false));
    //       fg.addControl(role.id, fa);
    //     }
    //   );
    //   this.form.addControl('permissions', fg);
    //   console.log('FORM', this.form);
    // }



  }

  createForum() {
    let path = this.route.snapshot.url[0].path;
    let operation = path.startsWith('editar-forum') ? 'UPDATE_FORUM' : 'CREATE_FORUM'

    let forum = this.form.getRawValue();
    this.forumService.operation(operation, forum).subscribe(
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
