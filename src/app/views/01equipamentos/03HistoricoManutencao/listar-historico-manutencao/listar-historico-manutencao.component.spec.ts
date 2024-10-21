import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHistoricoManutencaoComponent } from './listar-historico-manutencao.component';

describe('ListarHistoricoManutencaoComponent', () => {
  let component: ListarHistoricoManutencaoComponent;
  let fixture: ComponentFixture<ListarHistoricoManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarHistoricoManutencaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarHistoricoManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
