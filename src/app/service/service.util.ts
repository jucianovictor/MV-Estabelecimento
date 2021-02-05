import { HttpErrorResponse } from '@angular/common/http';
import { from, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Feedback } from '../model/dto/response/feedback.interfaces';
import { ServiceResponse } from '../model/dto/response/service-response.interface';
import { HTTPStatusCode } from '../model/enum/http-status-code.enum';

export interface ConditionFeedback {
  condition: (error: HttpErrorResponse) => boolean
  feedback: Feedback
}

export const serverErrors = [

  <ConditionFeedback> {
    condition: (error) => error.status === HTTPStatusCode.ServerErrors,
    feedback: {
      type: 'error',
      message: 'Erro inesperado no servidor',
      detail: 'Por favor contate o supervisor'
    }
  }

]

export const genericErrors = [
  ...serverErrors,
  <ConditionFeedback> {
    condition: (error) => !Object.values(HTTPStatusCode).includes(error.status),
    feedback: {
      type: 'error',
      message: 'Erro desconhecido',
      detail: 'Por favor contate o supervisor'
    }
  }

]

export function handleError<T>(error: HttpErrorResponse, conditionFeedbacks: ConditionFeedback[]) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred.
    return of(<ServiceResponse<T>> {
      data: null,
      feedback: {
        type: 'error',
        message: 'Client-side error:',
        detail: error.error.message
      }
    })
  }
    // The backend returned an unsuccessful response code.
  return from(conditionFeedbacks).pipe(
    first(cf => cf.condition(error)),
    map(cf => <ServiceResponse<T>> {
      data: null,
      feedback: cf.feedback
    })
  )
}

export function addSuccessFeedback<T>(response: ServiceResponse<T>, message: string, detail: string): ServiceResponse<T> {
  response.feedback = buildFeedback('success', message, detail)
  return response
}

export function toSuccessServiceResponse<T>(data: T, message: string, detail: string): ServiceResponse<T> {
  return <ServiceResponse<T>> {
    data: data,
    feedback: buildFeedback('success', message, detail)
  }
}

export function toServiceResponse<T>(data: T): ServiceResponse<T> {
  return <ServiceResponse<T>> {
    data: data,
    feedback: null
  }
}

export function buildFeedback(type: Feedback["type"], message: string, detail: string): Feedback {
  return <Feedback> {
    type: type,
    message: message,
    detail: detail
  }
}

