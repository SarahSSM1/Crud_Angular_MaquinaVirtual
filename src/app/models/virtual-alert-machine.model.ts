export type AlertType = 'success' | 'info' | 'warning' | 'danger';

export interface Alert {
  id: number;
  message: string;
  type: AlertType;
  timeout?: number;
}
