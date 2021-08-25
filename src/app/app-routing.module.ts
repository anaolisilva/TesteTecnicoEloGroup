import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NovoleadComponent } from './novolead/novolead.component';

const routes: Routes = [
  {path:'', component:LoginComponent, pathMatch:'full'},
  {path:"novolead", component:NovoleadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
