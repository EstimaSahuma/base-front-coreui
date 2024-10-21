import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoEquipamentoComponent } from './manutencao-equipamento.component';

describe('ManutencaoEquipamentoComponent', () => {
  let component: ManutencaoEquipamentoComponent;
  let fixture: ComponentFixture<ManutencaoEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManutencaoEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
