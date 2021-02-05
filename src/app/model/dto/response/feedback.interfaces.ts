export interface Feedback {
  type: 'success' | 'info' | 'warn' | 'error'
  message: string
  detail: string
}
