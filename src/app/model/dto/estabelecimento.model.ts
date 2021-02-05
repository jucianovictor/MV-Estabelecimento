import { Endereco } from "./endereco.model"
import { Profissional } from "./profissional.model"

export class Estabelecimento {
  estabelecimentoId?: number
  nome: string
  endereco: Endereco
  celular: string
  residencial: string
  profissionais: Profissional[]

  constructor(json?: Partial<Estabelecimento>) {
    this.profissionais = []
    this.endereco = new Endereco()
   Object.assign(this, json)
 }
}
