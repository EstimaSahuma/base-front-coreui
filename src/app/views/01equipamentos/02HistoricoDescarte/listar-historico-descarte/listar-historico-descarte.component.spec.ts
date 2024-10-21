import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHistoricoDescarteComponent } from './listar-historico-descarte.component';

describe('ListarHistoricoDescarteComponent', () => {
  let component: ListarHistoricoDescarteComponent;
  let fixture: ComponentFixture<ListarHistoricoDescarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarHistoricoDescarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarHistoricoDescarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
