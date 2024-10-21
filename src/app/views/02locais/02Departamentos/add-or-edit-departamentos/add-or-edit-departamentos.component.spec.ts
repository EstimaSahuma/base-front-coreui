import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditDepartamentosComponent } from './add-or-edit-departamentos.component';

describe('AddOrEditDepartamentosComponent', () => {
  let component: AddOrEditDepartamentosComponent;
  let fixture: ComponentFixture<AddOrEditDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditDepartamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
