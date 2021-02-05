export class Estado {

  sigla: string
  nome: string

  constructor(json: Partial<Estado>) {
    Object.assign(this, json)
  }
}
