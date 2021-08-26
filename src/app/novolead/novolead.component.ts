import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';

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
    console.log(this.formularioLead)
  }

  buildOportunidades() {

    const oportunidadesEscolhidas = this.oportunidades.map(op => new FormControl(false));

    return this.formBuilder.array(oportunidadesEscolhidas);

  }

  salvar() {
    let oportunidadesSubmit = Object.assign({}, this.formularioLead.value);

    oportunidadesSubmit = Object.assign(oportunidadesSubmit, {
      oportunidades: oportunidadesSubmit.oportunidades
        .map((op: boolean, i: number) => op ? this.oportunidades[i] : null)
        .filter((op: string) => op != null)
    });

    console.log(oportunidadesSubmit, this.formularioLead)

    //Colocar o dado do nome do lead no localstorage provavelmente
    //Talvez seja interessante, se der tempo, colocar validação de pelo menos um nos checkboxes

}

// Função que marca/desmarca todos os checkbox.

  checkAll(){
    if (!this.todosSelecionados){
      this.todosSelecionados = true;
    } else {
      this.todosSelecionados = false;
    }
  }

}
