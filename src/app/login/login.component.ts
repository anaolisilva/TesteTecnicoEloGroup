import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { StorageService } from '../service/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  chaveUser = 'Usuarios';
  usuarios: Usuario[] = [];
  novoUsuario: Usuario = new Usuario();

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmSenha: ['', [Validators.required, this.validaConfirmSenha]]
    })

  }

  ngOnInit() {

    if(localStorage.getItem(this.chaveUser)){

      this.usuarios = this.storageService.getDados(this.chaveUser)

    }

  }

  //Validação da confirmação de senha
  validaConfirmSenha = (ConfirmSenha: FormControl) => {
    const valorConfirmSenha = ConfirmSenha.value;

    if (this.formulario) {
      const valorSenha = this.formulario.get('senha')?.value;
      return (valorConfirmSenha == valorSenha) ? null : { senhasDiferentes: true };
    }

    return null;
  }



  registrar() {

    if (this.formulario.valid) {

      this.usuarios.push(this.novoUsuario);

      this.storageService.setDados(this.chaveUser, this.usuarios);

      this.novoUsuario = new Usuario();

      this.router.navigate(['/painel'])
    }

  }

}
