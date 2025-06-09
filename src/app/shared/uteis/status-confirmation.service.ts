import { Injectable, signal } from '@angular/core';

export type Status = 'START' | 'STOP' | 'SUSPEND';
export type AlertType = 'success' | 'danger';

@Injectable({ providedIn: 'root' })
export class StatusConfirmationService {
  alertMessage = signal<string | null>(null);
  alertType = signal<AlertType>('success');

  confirmDeleteId = signal<string | null>(null);
  confirmDeleteName = signal<string | null>(null);

  confirmStatusId = signal<string | null>(null);
  confirmStatusNew = signal<Status | null>(null);

  showAlert(message: string, type: AlertType = 'success') {
    this.alertMessage.set(message);
    this.alertType.set(type);
    setTimeout(() => this.alertMessage.set(null), 5000); 
  }

  askDelete(id: string, name: string) {
    this.confirmDeleteId.set(id);
    this.confirmDeleteName.set(name);
  }

  askStatusChange(id: string, newStatus: Status) {
    this.confirmStatusId.set(id);
    this.confirmStatusNew.set(newStatus);
  }

  resetConfirmation() {
    this.confirmDeleteId.set(null);
    this.confirmDeleteName.set(null);
    this.confirmStatusId.set(null);
    this.confirmStatusNew.set(null);
  }
}
