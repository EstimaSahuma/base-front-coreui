import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditRolesComponent } from './add-or-edit-roles.component';

describe('AddOrEditRolesComponent', () => {
  let component: AddOrEditRolesComponent;
  let fixture: ComponentFixture<AddOrEditRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
