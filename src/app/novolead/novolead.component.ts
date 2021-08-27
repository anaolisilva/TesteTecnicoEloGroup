import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, FormArray } from '@angular/forms';
import { Lead } from '../model/Lead';
import { StorageService } from '../service/storage.service';


@Component({
  selector: 'app-novolead',
  templateUrl: './novolead.component.html',
  styleUrls: ['./novolead.component.css']
})
export class NovoleadComponent implements OnInit {

  formularioLead: FormGroup
  oportunidades = ['RPA', 'Produto Digital', 'Analytics', 'BPM'];
  novoLead: Lead = new Lead('');
  leadsTodos: Lead[];

  todosSelecionados: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService
    ) {
    this.formularioLead = this.formBuilder.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      oportunidades: this.buildOportunidades()
    })
  }

  ngOnInit() {

    this.leadsTodos = this.storageService.getDados('Leads')

  }

  //Construção do array de oportunidades
  buildOportunidades() {

    const oportunidadesEscolhidas = this.oportunidades.map(op => new FormControl(false));

    return this.formBuilder.array(oportunidadesEscolhidas, this.requiredMinCheckbox);
  }


  //Regra de validação dos Checkbox
  requiredMinCheckbox() {
    const validator = (op: FormArray) => {
      const totalChecked = op.controls.map(v => v.value).reduce((total, atual) => atual ? total + atual : total, 0);
      return totalChecked >= 1 ? null : { minimo: true };

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

    this.novoLead.oportunidades = oportunidadesSubmit


    if (oportunidadesSubmit.oportunidades.length == 0) {
      alert('Escolha pelo menos uma oportunidade.')
    }

    if (this.formularioLead.valid) {

      this.leadsTodos = this.storageService.getDados('Leads')
      this.leadsTodos.push(this.novoLead)
      this.storageService.setDados('Leads', this.leadsTodos)

    }

}

// Função que marca/desmarca todos os checkbox.
//Agora adiciona no array, mas se desmarca um, desmarca todos.
  checkAll(){
    if (!this.todosSelecionados){
      this.todosSelecionados = true;
      Object.assign(this.formularioLead.value, {
        oportunidades: this.formularioLead.value.oportunidades.map((op: boolean) => op = true)
            })
    } else {
      this.todosSelecionados = false;
      Object.assign(this.formularioLead.value, {
        oportunidades: this.formularioLead.value.oportunidades.map((op: boolean) => op = false)
            })
    }
    console.log(this.formularioLead)

  }

}
