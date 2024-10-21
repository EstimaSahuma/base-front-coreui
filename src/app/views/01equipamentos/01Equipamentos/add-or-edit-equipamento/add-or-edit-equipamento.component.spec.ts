import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditEquipamentoComponent } from './add-or-edit-equipamento.component';

describe('AddOrEditEquipamentoComponent', () => {
  let component: AddOrEditEquipamentoComponent;
  let fixture: ComponentFixture<AddOrEditEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
