import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormLabelDirective, FormModule, ModalModule, SpinnerModule } from '@coreui/angular';

import { LocaisService } from '../../../02locais/services/locais.service';
import { TipoEquipamentoService } from '../../../03configuracoes/services/tipoequipamento.service';
import { EquipamentosService } from '../../services/equipamentos.service';
import { CondicaoService } from '../../../03configuracoes/services/condicao.service';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-or-edit-equipamento',
  standalone: true,
  imports: [CommonModule, ModalModule, ButtonCloseDirective, ButtonDirective, ReactiveFormsModule, FormModule, FormLabelDirective, SpinnerModule], // Adicionar CommonModule aqui
  templateUrl: './add-or-edit-equipamento.component.html',
  styleUrl: './add-or-edit-equipamento.component.scss'
})
export class AddOrEditEquipamentoComponent {
  myForm!: FormGroup;
  submitted = false;
  loading: boolean = false;
  @Output() loadList = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  public condicoes: any[] = [];
  public tipos_equipamentos: any[] = [];
  public locais: any[] = [];

  @Input() equipamento: any;
  @Input() title: string = 'Registar Equipamento';

  constructor(
    private fb: FormBuilder,
    private locaisService: LocaisService,
    private tipoEquipamentoService:TipoEquipamentoService,
    private condicaoService:CondicaoService,
    private toastr: ToastrService,
    private equipamentosService: EquipamentosService,
  ) {
    this.createForm();
    this.loadToForm()
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      serial_number: [null],  //ja
      description: ['', Validators.required],
      equipment_status_id: [1],   //ja
      equipment_type_id: ['', Validators.required], //ja
      location_id: ['', Validators.required], //ja
      condition_id: ['', Validators.required],  //ja
      purchase_date: [''],  //ja
      warranty_expiration_date: [''],  //ja
      value: ['', Validators.required],  //ja
      user_id: [1],  //ja
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.loading = true;
    const id = this.myForm.getRawValue().id;
    this.createOrEdit(this.myForm, id === null ? true : false, id);
  }


  get f() {
    return this.myForm.controls;
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id: any) {
    this.equipamentosService
      .storeOrUpdate(formulario.value, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          if (isCreate) {
            formulario.reset();
          }
          this.toastr.success(response.message, 'Sucesso');
          this.loadList.emit(Object(response).data);
        },
        (error) => {
          this.submitted = false;
          this.loading = false;
          this.toastr.error('Consultar a equipa técnica, algo deu errado', 'Erro');
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.myForm.reset();
    this.close.emit();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.equipamento) {
      this.title = 'Editar Equipamento';

      // Converter as datas para o formato 'YYYY-MM-DD'
      const purchase_date = this.formatDate(this.equipamento.purchase_date);
      const warranty_expiration_date = this.formatDate(this.equipamento.warranty_expiration_date);

      this.myForm.patchValue({
        ...this.equipamento,
        purchase_date: purchase_date,
        warranty_expiration_date: warranty_expiration_date,
      });

    } else {
      this.title = 'Registar Equipamento';
      this.onReset();
    }
  }
 // Função para converter a data para o formato 'YYYY-MM-DD'
 formatDate(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

  loadToForm() {
    this.getCondicoes()
    this.getTipoEquipamento()
    this.getLocais()
  }

  public getCondicoes() {
     this.condicaoService.getCondicoes().subscribe(data => {
       this.condicoes = data; 
     },
       error => {
         console.error('Erro ao buscar departamentos:', error);
       }
     );
   }

   public getTipoEquipamento() {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe(data => {
      this.tipos_equipamentos = data; 
    },
      error => {
        console.error('Erro ao buscar departamentos:', error);
      }
    );
  }

  public getLocais() {
    this.locaisService.getLocais().subscribe(data => {
      this.locais = data; 
    },
      error => {
        console.error('Erro ao buscar departamentos:', error);
      }
    );
  }
}
