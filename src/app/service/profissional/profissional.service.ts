import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, map } from 'rxjs/operators';
import { Profissional } from '../../model/dto/profissional.model';
import { Page } from '../../model/dto/response/page.interface';
import { ServiceResponse } from '../../model/dto/response/service-response.interface';
import { HTTPStatusCode } from '../../model/enum/http-status-code.enum';
import { addSuccessFeedback, ConditionFeedback, genericErrors, handleError, toSuccessServiceResponse } from '../service.util';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  private readonly API = 'http://localhost:8080/estabelecimento-api/v1/profissionais'

  constructor(private httpClient: HttpClient) { }

  public findAllPageable(page = 1, size?:number) {
    return this.httpClient.get<ServiceResponse<Page<Profissional>>>(`${this.API}?page=${page}${size ? `&size=${size}` : ``}`)
      .pipe(
        catchError(err => handleError<Page<Profissional>>(err, genericErrors))
      )
  }

  public upsert(profissional: Profissional) {
    profissional.estabelecimentos.forEach(e => e.profissionais = [])
    if (profissional.profissionalId) {
      return this.update(profissional)
    } else {
      return this.save(profissional)
    }
  }

  private update(profissional: Profissional) {
    return this.httpClient.put<ServiceResponse<Profissional>>(`${this.API}/${profissional.profissionalId}`, profissional)
      .pipe(
        map(response => addSuccessFeedback(response, 'Sucesso', 'Profissional atualizado')),
        catchError(err => handleError<Profissional>(err, genericErrors))
      )
  }

  private save(profissional: Profissional) {
    return this.httpClient.post<ServiceResponse<Profissional>>(`${this.API}`, profissional)
      .pipe(
        map(response => addSuccessFeedback(response, 'Sucesso', 'Profissional salvo')),
        catchError(err => handleError<Profissional>(err, responsesTreatments.profissionalUpdateOrDelete))
      )
  }

  public deleteById(id: number) {
    return this.httpClient.delete<HttpResponse<null>>(`${this.API}/${id}`, {
      observe: 'response'
    }).pipe(
      map(response => toSuccessServiceResponse<number>(response.status, 'Successo', 'Profissional removido')),
      catchError(err => handleError<number>(err, responsesTreatments.profissionalUpdateOrDelete))
    )
  }

  public deleteByIds(ids: Array<number>) {
    return this.httpClient.delete<HttpResponse<null>>(`${this.API}/?id=${ids.toString().replace(/\[^\d]/g, '&id=')}`, {
      observe: 'response'
    }).pipe(
      map(response => toSuccessServiceResponse<number>(response.status, 'Successo', ids.length > 1 ? `Profissionais removidos` : `Profissional removido`)),
      catchError(err => handleError<number>(err, responsesTreatments.profissionalUpdateOrDelete))
    )
  }
}

const responsesTreatments = {
  profissionalUpdateOrDelete: [
    ...genericErrors,
    <ConditionFeedback> {
      condition: (error) => error.status === HTTPStatusCode.NotFound,
      feedback: {
        type: 'warn',
        message: 'Profissional não encontrado',
        detail: 'O profissional pode já ter sido removido por outro usuário'
      }
    }
  ]
}
