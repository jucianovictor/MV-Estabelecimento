import { Feedback } from './feedback.interfaces';

export interface ServiceResponse<T> {
  data: T
  feedback: Feedback
}
