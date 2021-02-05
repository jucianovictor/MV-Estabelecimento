import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Cidade } from 'src/app/model/dto/cidade.model';
import { Estado } from 'src/app/model/dto/estado.model';
import { genericErrors, handleError, toServiceResponse } from '../service.util';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  private readonly API = 'https://servicodados.ibge.gov.br/api/v1/localidades'

  constructor(private httpClient: HttpClient) { }

  findCidadesByUF(uf: string) {
    return this.httpClient.get<Cidade[]>(`${this.API}/estados/${uf}/municipios`)
      .pipe(
        map(response => toServiceResponse<Cidade[]>(response)),
        catchError(err => handleError<Cidade[]>(err, genericErrors))
      )
  }

  findAllEstados() {
    return this.httpClient.get<Estado[]>(`${this.API}/estados/`)
      .pipe(
        map(response => toServiceResponse<Estado[]>(response)),
        catchError(err => handleError<Estado[]>(err, genericErrors))
      )
  }
}

