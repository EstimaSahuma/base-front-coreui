import { Component, OnInit } from '@angular/core';
import { NgStyle,CommonModule } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, FormModule, SpinnerModule } from '@coreui/angular';
import { Router } from '@angular/router'; // Importando o Router
import { AuthService } from './../service/auth.service'; // Importando o AuthService
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule,SpinnerModule,ReactiveFormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormModule, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent  implements OnInit  {
  myForm!: FormGroup;
  loading: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router,private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();  // Inicializa o formulário ao iniciar o componente
  }

  createForm() {
    this.myForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]], // Validação de email
      password: [null, Validators.required]
    });
  }

  login() {
    this.loading = true;
    if (this.myForm.valid) {
      // Verifica se o formulário é válido antes de chamar o serviço
      this.authService.login(this.myForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.toastr.error('Login falhou! Verifique suas credenciais', 'Erro');
          this.loading = false;
        }
      });
    } else {
      this.toastr.error('Preencha todos os campos corretamente.', 'Erro');
      this.loading = false;
    }
  }

}
