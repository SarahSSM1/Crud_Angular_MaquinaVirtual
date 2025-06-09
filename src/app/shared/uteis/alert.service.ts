import { Injectable, signal } from '@angular/core';
import { Alert, AlertType } from 'src/app/models/virtual-alert-machine.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alerts = signal<Alert[]>([]);
  readonly alerts = this._alerts.asReadonly();

  private nextId = 0;

  showAlert(message: string, type: AlertType = 'info', timeout = 5000) {
    const alert: Alert = {
      id: this.nextId++,
      message,
      type,
      timeout,
    };

    this._alerts.update((currentAlerts: Alert[]) => [...currentAlerts, alert]);

    if (timeout > 0) {
      setTimeout(() => this.removeAlert(alert.id), timeout);
    }
  }

  removeAlert(id: number) {
    this._alerts.update((currentAlerts: Alert[]) =>
      currentAlerts.filter((a: Alert) => a.id !== id)
    );
  }
}
