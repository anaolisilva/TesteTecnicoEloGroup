import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-novolead',
  templateUrl: './novolead.component.html',
  styleUrls: ['./novolead.component.css']
})
export class NovoleadComponent implements OnInit {

  formularioLead : FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.formularioLead = this.formBuilder.group({
      nome:['', [Validators.required]],
      telefone: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]]
    })
   }

  listaOportunidades : string[] = ['RPA', 'Produto Digital', 'Analytics', 'BPM'];


  ngOnInit() {
    console.log(this.listaOportunidades)
  }


  checkAll(){

  }

}
