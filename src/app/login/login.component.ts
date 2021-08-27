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

  constructor(
    private formBuilder: FormBuilder,
    ) {
    this.formulario = this.formBuilder.group({
      usuario:['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmSenha: ['', [Validators.required, ValidFormService.validaConfirmSenha]]
    })

   }

  ngOnInit(): void {

  }




}
