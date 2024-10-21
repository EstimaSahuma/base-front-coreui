import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditUsuariosComponent } from './add-or-edit-usuarios.component';

describe('AddOrEditUsuariosComponent', () => {
  let component: AddOrEditUsuariosComponent;
  let fixture: ComponentFixture<AddOrEditUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
