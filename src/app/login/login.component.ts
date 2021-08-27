import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../service/valid-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  usuarios:Array<string> = [];
  senhas: Array<string> = [];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmSenha: ['', [Validators.required, ValidFormService.validaConfirmSenha]]
    })

  }

  ngOnInit() {
    if(localStorage.getItem('Usuarios')){
      this.usuarios = (JSON.parse(localStorage.getItem('Usuarios')!))
    }

  }

  registrar() {

    if (this.formulario.valid) {
      this.usuarios.push(this.formulario.get('usuario')?.value)

      console.log(this.usuarios)

      return localStorage.setItem('Usuarios', JSON.stringify(this.usuarios))
    }


  }




}
