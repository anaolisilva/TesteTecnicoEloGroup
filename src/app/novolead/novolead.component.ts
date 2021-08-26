import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-novolead',
  templateUrl: './novolead.component.html',
  styleUrls: ['./novolead.component.css']
})
export class NovoleadComponent implements OnInit {

  formularioLead: FormGroup
  oportunidades = ['RPA', 'Produto Digital', 'Analytics', 'BPM'];

  todosSelecionados: boolean = false

  constructor(private formBuilder: FormBuilder) {
    this.formularioLead = this.formBuilder.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      oportunidades: this.buildOportunidades()
    })
  }



  ngOnInit() {
    console.log(this.formularioLead.controls.oportunidades.getError('minimo'))
  }

  //Construção do array de oportunidades
  buildOportunidades() {

    const oportunidadesEscolhidas = this.oportunidades.map(op => new FormControl(false));

    return this.formBuilder.array(oportunidadesEscolhidas, this.requiredMinCheckbox);
  }

  //Regra de validação dos Checkbox
  //Passar todas as regras de validação para uma service de formulários?
  requiredMinCheckbox(){
    const validator = (op: FormArray) => {
      const totalChcked = op.controls.map(v => v.value).reduce((total, atual) => atual ? total + atual : total, 0);
      return totalChcked >= 1 ? null : {minimo : true};

    }

    return validator;
  }

  //Função do botão salvar
  salvar() {
    // let oportunidadesSubmit = Object.assign({}, this.formularioLead.value);

    let oportunidadesSubmit = Object.assign(this.formularioLead.value, {
      oportunidades: this.formularioLead.value.oportunidades
        .map((op: boolean, i: number) => op ? this.oportunidades[i] : null)
        .filter((op: string) => op != null)
    });

    console.log(oportunidadesSubmit)


    if (oportunidadesSubmit.oportunidades.length == 0) {
      alert('Escolha pelo menos uma oportunidade.')
    }


    //Colocar o dado do nome do lead no localstorage provavelmente
    //Colocar validação de pelo menos um nos checkboxes

}

// Função que marca/desmarca todos os checkbox.
// Não funciona porque não as adiciona no array.
  checkAll(){
    if (!this.todosSelecionados){
      this.todosSelecionados = true;
    } else {
      this.todosSelecionados = false;
    }

  }

}
