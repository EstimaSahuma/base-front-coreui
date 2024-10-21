import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescartarEquipamentoComponent } from './descartar-equipamento.component';

describe('DescartarEquipamentoComponent', () => {
  let component: DescartarEquipamentoComponent;
  let fixture: ComponentFixture<DescartarEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescartarEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescartarEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
