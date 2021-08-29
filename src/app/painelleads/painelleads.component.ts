import { Component, OnInit } from '@angular/core';
import { Lead } from '../model/Lead';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-painelleads',
  templateUrl: './painelleads.component.html',
  styleUrls: ['./painelleads.component.css']
})
export class PainelleadsComponent implements OnInit {


  OrgIntern: Lead = new Lead("Org. Internacionais");
  IndFarm: Lead = new Lead("Ind. Farm. LTDA", 'B');
  SoundLive: Lead = new Lead("Musc. Sound Live Cmp");

  todosLeads: Lead[];

  chaveLead = "Leads";

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(){

    this.todosLeadsBuilder();

    if(this.storageService.getDados(this.chaveLead)){
      this.todosLeads = this.storageService.getDados(this.chaveLead)
    } else {
      this.storageService.setDados(this.chaveLead, this.todosLeads)
    }
    console.log(this.todosLeads)



  }

  todosLeadsBuilder() {
    this.todosLeads = [this.OrgIntern, this.IndFarm, this.SoundLive];
  }


  tabelastatus(index: number, col: number, lead: Lead) {

    //muda status do lead para guardar a posição se sair de página
    if (col == 1){
      lead.state = "B"

    } else if (col == 2) {
      lead.state = "C"
    }

    let idAcess = '#c' + col + '-' + index;

    let tds = document.querySelector(idAcess); //célula acessada

    let edit = tds!.innerHTML; //Fica com o valor do que está na célula.

    col++;

    let idAtualizado = '#c' + col + '-' + index;

    let interm = document.querySelector(idAtualizado);

    interm!.innerHTML = edit;

    tds!.innerHTML = '';

    this.storageService.setDados(this.chaveLead, this.todosLeads)

  }

}
