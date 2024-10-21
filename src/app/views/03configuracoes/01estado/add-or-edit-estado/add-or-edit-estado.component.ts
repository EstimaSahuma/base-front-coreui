import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormLabelDirective, FormModule, ModalModule, SpinnerModule } from '@coreui/angular';
import { EstadosService } from '../../services/estados.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-or-edit-estado',
  standalone: true,
  imports: [CommonModule, ModalModule, ButtonCloseDirective, ButtonDirective, ReactiveFormsModule, FormModule, FormLabelDirective, SpinnerModule], // Adicionar CommonModule aqui
  templateUrl: './add-or-edit-estado.component.html',
  styleUrl: './add-or-edit-estado.component.scss'
})
export class AddOrEditEstadoComponent {
  myForm!: FormGroup;
  submitted = false;
  loading: boolean = false;
  @Output() loadList = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Input() estado: any;
  @Input() title: string = 'Registar Estado';

  constructor(
    private fb: FormBuilder,
    private estadosService: EstadosService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      status_name: ['', Validators.required],
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
    this.estadosService
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
    if (this.estado) {
      this.title = 'Editar Estado';
      this.myForm.patchValue(this.estado);
    } else {
      this.title = 'Registar Estado';
      this.onReset();
    }
  }
}
