import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getDados(chave: string): any {
    if(localStorage.getItem(chave)){

      return JSON.parse(localStorage.getItem(chave)!);

    }else {
      return null;
    }
  }

  setDados(chave: string, dados: any){
    localStorage.setItem(chave, JSON.stringify(dados));
  }

}
