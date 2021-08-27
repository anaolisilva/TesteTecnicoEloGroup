import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, FormArray } from '@angular/forms';
import { ValidFormService } from '../service/valid-form.service';


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

  }

  //Construção do array de oportunidades
  buildOportunidades() {

    const oportunidadesEscolhidas = this.oportunidades.map(op => new FormControl(false));

    return this.formBuilder.array(oportunidadesEscolhidas, ValidFormService.requiredMinCheckbox);
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
