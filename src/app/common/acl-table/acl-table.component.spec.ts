import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AclTableComponent } from './acl-table.component';

describe('AclTableComponent', () => {
  let component: AclTableComponent;
  let fixture: ComponentFixture<AclTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AclTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AclTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
