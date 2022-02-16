import { AfterViewInit, Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, startWith, Subscription } from 'rxjs';
import { ForumACL } from 'src/app/models/forum-acl';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'acl-table',
  templateUrl: './acl-table.component.html',
  styleUrls: ['./acl-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AclTableComponent),
      multi: true
    }
  ]
})
export class AclTableComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  acls: ForumACL[];
  @Input() roles: Role[];
  form: FormArray;
  sub: Subscription;

  constructor(private formBuilder: FormBuilder) { }

  onChange = (obj: any) => { };
  writeValue(obj: any): void { this.acls = obj; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {

    if (!this.acls) {
      this.acls = [];
      this.roles.forEach(role => this.acls.push(new ForumACL()));
    }

    this.form = this.formBuilder.array([])
    let forms;
    this.acls.forEach(
      (acl, index) => {

        this.form.push(this.formBuilder.group({
          read_topic: [acl.read_topic],
          write_topic: [acl.write_topic],
          edit_topic: [acl.edit_topic],
          delete_topic: [acl.delete_topic],
          write_post: [acl.write_post],
          edit_post: [acl.edit_post],
          delete_post: [acl.delete_post],
          id: [acl.id], // Usado na edição do fórum
          role_id: [this.roles[index].id] // Usado na criação do fórum
        }));
      }
    );

    this.sub = this.form.valueChanges.pipe(debounceTime(80), startWith(this.form.getRawValue())).subscribe(
      val => {
        this.onChange(this.form.getRawValue());
      }
    );
  }

  getForm() {
    return this.form.controls as FormGroup[];
  }

}
