import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidFormService {

  constructor() { }

  //Validação da confirmação de senha
  static validaConfirmSenha = (ConfirmSenha: FormControl, form: FormGroup) => {
    const valorConfirmSenha = ConfirmSenha.value;

    if (form) {
      const valorSenha = form.get('senha')?.value;
      return (valorConfirmSenha == valorSenha) ? null : { senhasDiferentes: true }
    }

    return null;
  }

  //Regra de validação dos Checkbox
  static requiredMinCheckbox() {
    const validator = (op: FormArray) => {
      const totalChcked = op.controls.map(v => v.value).reduce((total, atual) => atual ? total + atual : total, 0);
      return totalChcked >= 1 ? null : { minimo: true };

    }

    return validator;
  }


}
