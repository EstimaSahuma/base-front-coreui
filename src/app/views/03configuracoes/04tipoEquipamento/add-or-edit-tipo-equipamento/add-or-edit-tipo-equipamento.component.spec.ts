import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTipoEquipamentoComponent } from './add-or-edit-tipo-equipamento.component';

describe('AddOrEditTipoEquipamentoComponent', () => {
  let component: AddOrEditTipoEquipamentoComponent;
  let fixture: ComponentFixture<AddOrEditTipoEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditTipoEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditTipoEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
