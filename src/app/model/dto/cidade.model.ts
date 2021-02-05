export class Cidade {

  nome: string

  constructor(json: Partial<Cidade>) {
    Object.assign(this, json)
  }
}
