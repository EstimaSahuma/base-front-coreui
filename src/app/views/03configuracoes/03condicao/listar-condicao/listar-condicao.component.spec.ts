import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCondicaoComponent } from './listar-condicao.component';

describe('ListarCondicaoComponent', () => {
  let component: ListarCondicaoComponent;
  let fixture: ComponentFixture<ListarCondicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCondicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCondicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
