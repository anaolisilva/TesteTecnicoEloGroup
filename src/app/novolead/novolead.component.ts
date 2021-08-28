import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
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
  chaveLead = "Leads";

  todosSelecionados: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {
    this.formularioLead = this.formBuilder.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      oportunidades: this.buildOportunidades()
    })
  }

  ngOnInit() {

    this.leadsTodos = this.storageService.getDados(this.chaveLead)

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

    //Registra as oportunidades do lead escolhidas
    let oportunidadesSubmit = Object.assign(this.formularioLead.value, {
      oportunidades: this.formularioLead.value.oportunidades
        .map((op: boolean, i: number) => op ? this.oportunidades[i] : null)
        .filter((op: string) => op != null)
    });

    this.novoLead.oportunidades = oportunidadesSubmit


    if (oportunidadesSubmit.oportunidades.length == 0) {
      alert('Escolha pelo menos uma oportunidade.')
      history.pushState('', '/')
    }

    if (this.formularioLead.valid) {

      this.leadsTodos = this.storageService.getDados(this.chaveLead)
      this.leadsTodos.push(this.novoLead)
      this.storageService.setDados(this.chaveLead, this.leadsTodos)

      this.router.navigate(['/painel'])

    }

  }

  // Função que marca/desmarca todos os checkbox.
  //Agora adiciona no array, mas se desmarca um, desmarca todos.
  checkAll() {
    if (!this.todosSelecionados) {
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
