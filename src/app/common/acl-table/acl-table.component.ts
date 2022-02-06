import { AfterViewInit, Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  form: FormGroup;
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

    let forms = []
    this.acls.forEach(
      (acl, index) => {
        let fg = this.formBuilder.group({});
        fg.addControl('read_topic', new FormControl(acl.read_topic));
        fg.addControl('write_topic', new FormControl(acl.write_topic));
        fg.addControl('edit_topic', new FormControl(acl.edit_topic));
        fg.addControl('delete_topic', new FormControl(acl.delete_topic));
        fg.addControl('write_post', new FormControl(acl.write_post));
        fg.addControl('edit_post', new FormControl(acl.edit_post));
        fg.addControl('delete_post', new FormControl(acl.delete_post));
        fg.addControl('id', new FormControl(acl.id)); // Usado na edição do fórum
        fg.addControl('role_id', new FormControl(this.roles[index].id)); // Usado na criação do fórum
        forms.push(fg);
      }
    );

    this.form = this.formBuilder.group(forms);
    this.sub = this.form.valueChanges.pipe(debounceTime(80), startWith(this.form.getRawValue())).subscribe(
      val => {
        this.onChange(this.form.getRawValue());
      }
    );
  }

}
