import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCondicaoComponent } from './add-or-edit-condicao.component';

describe('AddOrEditCondicaoComponent', () => {
  let component: AddOrEditCondicaoComponent;
  let fixture: ComponentFixture<AddOrEditCondicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditCondicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditCondicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
