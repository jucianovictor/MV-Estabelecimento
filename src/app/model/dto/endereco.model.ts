export class Endereco {
	 rua: string
	 numCasa: string
	 bairro: string
	 cidade: string
   estado: string

   constructor(json?: Partial<Endereco>) {
    Object.assign(this, json)
  }
}
