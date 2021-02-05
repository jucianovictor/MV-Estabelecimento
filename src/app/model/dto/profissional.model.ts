import { Endereco } from "./endereco.model"
import { Estabelecimento } from "./estabelecimento.model"

export class Profissional {
  profissionalId?: number
  nome: string
  endereco: Endereco
  celular: string
  residencial: string
  funcao: string
  estabelecimentos: Estabelecimento[]

  constructor(json?: Partial<Profissional>) {
    this.estabelecimentos = []
    this.endereco = new Endereco()
    Object.assign(this, json)
  }
}
