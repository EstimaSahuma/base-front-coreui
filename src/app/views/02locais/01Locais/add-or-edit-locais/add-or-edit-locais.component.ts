import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormLabelDirective, FormModule, ModalModule, SpinnerModule } from '@coreui/angular';
import { DepartamentosService } from '../../services/departamentos.service';
import { LocaisService } from '../../services/locais.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-or-edit-locais',
  standalone: true,
  imports: [CommonModule, ModalModule, ButtonCloseDirective, ButtonDirective, ReactiveFormsModule, FormModule, FormLabelDirective, SpinnerModule], // Adicionar CommonModule aqui
  templateUrl: './add-or-edit-locais.component.html',
  styleUrl: './add-or-edit-locais.component.scss'
})
export class AddOrEditLocaisComponent {
  myForm!: FormGroup;
  submitted = false;
  loading: boolean = false;
  @Output() loadList = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  public departamentos: any[] = [];

  @Input() local: any;
  @Input() title: string = 'Registar Local';

  constructor(
    private fb: FormBuilder,
    private departamentosService: DepartamentosService,
    private toastr: ToastrService,
    private locaisService:LocaisService
  ) {
    this.createForm();
    this.loadToForm()
  }


  createForm() {
    this.myForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      location_name: ['', Validators.required],
      department_id: [null, Validators.required]
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
    this.locaisService
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
    if (this.local) {
      this.title = 'Editar Local';
      this.myForm.patchValue(this.local);
    } else {
      this.title = 'Registar Local';
      this.onReset();
    }
  }

  loadToForm() {
    this.getDepartamentos()
  }

  public getDepartamentos() {
    this.departamentosService.getDepartamentos().subscribe(data => {
      this.departamentos = data; 
    },
      error => {
        console.error('Erro ao buscar departamentos:', error);
      }
    );
  }
}
