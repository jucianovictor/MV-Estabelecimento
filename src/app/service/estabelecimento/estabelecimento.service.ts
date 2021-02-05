import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, map } from 'rxjs/operators';
import { Estabelecimento } from '../../model/dto/estabelecimento.model';
import { Page } from '../../model/dto/response/page.interface';
import { ServiceResponse } from '../../model/dto/response/service-response.interface';
import { HTTPStatusCode } from '../../model/enum/http-status-code.enum';
import { addSuccessFeedback, ConditionFeedback, genericErrors, handleError, toSuccessServiceResponse } from '../service.util';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  private readonly API = 'http://localhost:8080/estabelecimento-api/v1/estabelecimentos'

  constructor(private httpClient: HttpClient) { }

  public findAllPageable(page = 1, size?: number) {
    return this.httpClient.get<ServiceResponse<Page<Estabelecimento>>>(`${this.API}?page=${page}${size ? `&size=${size}` : ``}`)
      .pipe(
        catchError(err => handleError<Page<Estabelecimento>>(err, genericErrors))
      )
  }

  public upsert(estabelecimento: Estabelecimento) {
    if (estabelecimento.estabelecimentoId) {
      return this.update(estabelecimento)
    } else {
      return this.save(estabelecimento)
    }
  }

  private update(estabelecimento: Estabelecimento) {
    return this.httpClient.put<ServiceResponse<Estabelecimento>>(`${this.API}/${estabelecimento.estabelecimentoId}`, estabelecimento)
      .pipe(
        map(response => addSuccessFeedback(response, 'Sucesso', 'Estabelecimento atualizado')),
        catchError(err => handleError<Estabelecimento>(err, responsesTreatments.estabelecimentoUpdateOrDelete))
      )
  }

  private save(estabelecimento: Estabelecimento) {
    return this.httpClient.post<ServiceResponse<Estabelecimento>>(`${this.API}`, estabelecimento)
      .pipe(
        map(response => addSuccessFeedback(response, 'Sucesso', 'Estabelecimento salvo')),
        catchError(err => handleError<Estabelecimento>(err, genericErrors))
      )
  }

  public deleteById(id: number) {
    return this.httpClient.delete<HttpResponse<null>>(`${this.API}/${id}`, {
      observe: 'response'
    }).pipe(
      map(response => toSuccessServiceResponse<number>(response.status, 'Successo', 'Estabelecimento removido')),
      catchError(err => handleError<number>(err, responsesTreatments.estabelecimentoUpdateOrDelete))
    )
  }

  public deleteByIds(ids: Array<number>) {
    return this.httpClient.delete<HttpResponse<null>>(`${this.API}/?id=${ids.toString().replace(/\[^\d]/g, '&id=')}`, {
      observe: 'response'
    }).pipe(
      map(response => toSuccessServiceResponse<number>(response.status, 'Successo', ids.length > 1 ? `Estabelecimentos removidos` : `Estabelecimento removido`)),
      catchError(err => handleError<number>(err, responsesTreatments.estabelecimentoUpdateOrDelete))
    )
  }
}

const responsesTreatments = {
  estabelecimentoUpdateOrDelete: [
    ...genericErrors,
    <ConditionFeedback> {
      condition: (error) => error.status === HTTPStatusCode.NotFound,
      feedback: {
        type: 'warn',
        message: 'Estabelecimento não encontrado',
        detail: 'O estabelecimento pode ter sido removido por outro usuário'
      }
    }
  ]
}
