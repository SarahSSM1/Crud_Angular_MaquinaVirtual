import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertService } from 'src/app/shared/uteis/alert.service';


@Component({
  selector: 'app-alert-machine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-machine.component.html',
  styleUrl: './alert-machine.component.scss',
})
export class AlertMachineComponent {
  public alertService = inject(AlertService);

  closeAlert(id: number) {
    this.alertService.removeAlert(id);
  }
}
