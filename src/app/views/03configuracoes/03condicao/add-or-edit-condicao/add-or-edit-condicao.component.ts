import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormLabelDirective, FormModule, ModalModule, SpinnerModule } from '@coreui/angular';
import { CondicaoService } from '../../services/condicao.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-or-edit-condicao',
  standalone: true,
  imports: [CommonModule, ModalModule, ButtonCloseDirective, ButtonDirective, ReactiveFormsModule, FormModule, FormLabelDirective, SpinnerModule], // Adicionar CommonModule aqui
  templateUrl: './add-or-edit-condicao.component.html',
  styleUrl: './add-or-edit-condicao.component.scss'
})
export class AddOrEditCondicaoComponent {
  myForm!: FormGroup;
  submitted = false;
  loading: boolean = false;
  @Output() loadList = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Input() condicao: any;
  @Input() title: string = 'Registar Condição';

  constructor(
    private fb: FormBuilder,
    private condicaoService: CondicaoService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      condition_name: ['', Validators.required],
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
    this.condicaoService
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
    if (this.condicao) {
      this.title = 'Editar Condição';
      this.myForm.patchValue(this.condicao);
    } else {
      this.title = 'Registar Condição';
      this.onReset();
    }
  }
}
