import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditEstadoComponent } from './add-or-edit-estado.component';

describe('AddOrEditEstadoComponent', () => {
  let component: AddOrEditEstadoComponent;
  let fixture: ComponentFixture<AddOrEditEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditEstadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
