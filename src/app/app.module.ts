import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NovoleadComponent } from './novolead/novolead.component';
import { PainelleadsComponent } from './painelleads/painelleads.component';
import { ValidFormService } from './service/valid-form.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NovoleadComponent,
    PainelleadsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ValidFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
