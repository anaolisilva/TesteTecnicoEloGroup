import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder

    ) {
    this.formulario = this.formBuilder.group({
      usuario: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

   }

  ngOnInit(): void {
  }




}
