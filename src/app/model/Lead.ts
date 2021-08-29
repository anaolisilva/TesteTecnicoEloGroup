export class Lead {

  public nome: string
  public telefone: string
  public email: string
  public oportunidades: string[]
  public state: string

  constructor(nome: string, state = 'A') {
    this.nome = nome;
    this.state = state;
   }

}
