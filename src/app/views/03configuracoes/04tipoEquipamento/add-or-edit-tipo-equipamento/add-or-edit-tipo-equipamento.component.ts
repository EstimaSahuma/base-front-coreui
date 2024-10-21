import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormLabelDirective, FormModule, ModalModule, SpinnerModule } from '@coreui/angular';
import { CategoriaService } from '../../services/categoria.service';
import { TipoEquipamentoService } from '../../services/tipoequipamento.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-or-edit-tipo-equipamento',
  standalone: true,
  imports: [CommonModule, ModalModule, ButtonCloseDirective, ButtonDirective, ReactiveFormsModule, FormModule, FormLabelDirective, SpinnerModule], // Adicionar CommonModule aqui
  templateUrl: './add-or-edit-tipo-equipamento.component.html',
  styleUrl: './add-or-edit-tipo-equipamento.component.scss'
})
export class AddOrEditTipoEquipamentoComponent {
  myForm!: FormGroup;
  submitted = false;
  loading: boolean = false;
  @Output() loadList = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  public categorias: any[] = [];

  @Input() tipo_equipamento: any;
  @Input() title: string = 'Registar Tipo de Equipamento';

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private tipoEquipamentoService:TipoEquipamentoService
  ) {
    this.createForm();
    this.loadToForm()
  }


  createForm() {
    this.myForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      type_name: ['', Validators.required],
      equipment_category_id: [null, Validators.required]
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
    this.tipoEquipamentoService
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
    if (this.tipo_equipamento) {
      this.title = 'Editar Tipo de Equipamento';
      this.myForm.patchValue(this.tipo_equipamento);
    } else {
      this.title = 'Registar Tipo de Equipamento';
      this.onReset();
    }
  }

  loadToForm() {
    this.getCategorias()
  }

  public getCategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data; 
    },
      error => {
        console.error('Erro ao buscar departamentos:', error);
      }
    );
  }
}
