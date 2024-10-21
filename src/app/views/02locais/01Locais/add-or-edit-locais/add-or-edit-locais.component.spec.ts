import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditLocaisComponent } from './add-or-edit-locais.component';

describe('AddOrEditLocaisComponent', () => {
  let component: AddOrEditLocaisComponent;
  let fixture: ComponentFixture<AddOrEditLocaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditLocaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditLocaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
