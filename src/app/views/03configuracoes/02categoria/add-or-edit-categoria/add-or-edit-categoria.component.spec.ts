import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCategoriaComponent } from './add-or-edit-categoria.component';

describe('AddOrEditCategoriaComponent', () => {
  let component: AddOrEditCategoriaComponent;
  let fixture: ComponentFixture<AddOrEditCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
