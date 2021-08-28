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
  IndFarm: Lead = new Lead("Ind. Farm. LTDA");
  SoundLive: Lead = new Lead("Musc. Sound Live Cmp");

  todosLeads: Lead[];


  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(){
    this.todosLeadsBuilder()

    if(this.storageService.getDados('Leads')){
      this.todosLeads = this.storageService.getDados('Leads')
    } else {
      this.storageService.setDados('Leads', this.todosLeads)
    }

    console.log(this.todosLeads)

  }

  todosLeadsBuilder() {
    this.todosLeads = [this.OrgIntern, this.IndFarm, this.SoundLive];
  }


  tabelastatus(index: number, col: number) {

    let idAcess = '#c' + col + '-' + index;

    let tds = document.querySelector(idAcess); //célula acessada

    let edit = tds!.innerHTML; //Fica com o valor do que está na célula.

    col++;

    let idAtualizado = '#c' + col + '-' + index;

    let interm = document.querySelector(idAtualizado);


    interm!.innerHTML = edit;

    tds!.innerHTML = '';

  }

}
