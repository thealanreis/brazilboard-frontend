import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { editorConfig } from 'src/app/common/angular-editor-config';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreatePostComponent),
      multi: true
    }
  ]
})

export class CreatePostComponent implements OnInit, ControlValueAccessor {
  form: FormGroup;
  config = editorConfig;

  constructor(private formBuilder: FormBuilder) { }

  onChange = (obj: string) => {};
  writeValue(obj: string): void {this.form.get('content').setValue(obj);}
  registerOnChange(fn: any): void {this.onChange = fn;}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {
    this.initializeForm();
    this.form.valueChanges.pipe(debounceTime(80)).subscribe(
      val => this.onChange(val.content)
    )
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

}