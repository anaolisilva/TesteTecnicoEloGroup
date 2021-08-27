import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NovoleadComponent } from './novolead/novolead.component';
import { PainelleadsComponent } from './painelleads/painelleads.component';

const routes: Routes = [
  {path:'', component:LoginComponent, pathMatch:'full'},
  {path:'painel', component:PainelleadsComponent},
  {path:"novolead", component:NovoleadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
