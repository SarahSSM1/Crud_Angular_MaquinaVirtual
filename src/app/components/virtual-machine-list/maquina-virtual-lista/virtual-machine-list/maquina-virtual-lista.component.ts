import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { VirtualMachine } from 'src/app/models/virtual-machine.model';
import { VirtualMachineService } from 'src/app/service/virtual-machine.service';
import { StatusConfirmationService } from 'src/app/shared/uteis/status-confirmation.service';
import {
  getStatusActionLabel,
  getStatusButtonClass,
  getStatusClass,
  getStatusDisplayName,
  Status,
} from 'src/app/shared/uteis/status-helper';

@Component({
  standalone: true,
  selector: 'app-maquina-virtual-lista',
  templateUrl: './maquina-virtual-lista.component.html',
  styleUrls: ['./maquina-virtual-lista.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class MaquinaVirtualListaComponent implements OnInit, OnDestroy {
  virtualMachines: VirtualMachine[] = [];
  isLoading = true;

  private destroy$ = new Subject<void>();
  private service = inject(VirtualMachineService);
  private router = inject(Router);
  private confirmService = inject(StatusConfirmationService);

  ngOnInit(): void {
    this.loadVirtualMachines();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get alertMessage() {
    return this.confirmService.alertMessage();
  }

  get alertType() {
    return this.confirmService.alertType();
  }

  get confirmDeleteId() {
    return this.confirmService.confirmDeleteId();
  }

  get confirmDeleteName() {
    return this.confirmService.confirmDeleteName();
  }

  get confirmStatusId() {
    return this.confirmService.confirmStatusId();
  }

  get confirmStatusNew() {
    return this.confirmService.confirmStatusNew();
  }

  getStatusButtonClass(status: Status): string {
    return getStatusButtonClass(status);
  }

  getStatusClass(status: Status): string {
    return getStatusClass(status);
  }

  getStatusActionLabel(status: Status): string {
    return getStatusActionLabel(status);
  }

  getStatusDisplayName(status: Status | null): string {
    return getStatusDisplayName(status);
  }

  goToNewMachine(): void {
    this.router.navigate(['/machines/new']);
  }

  loadVirtualMachines(): void {
    this.isLoading = true;
    this.service
      .getAllVirtualMachines()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.virtualMachines = data;
          this.isLoading = false;
        },
        error: () => {
          this.confirmService.showAlert(
            'Não foi possível carregar as máquinas virtuais.',
            'danger'
          );
          this.isLoading = false;
        },
      });
  }

  editVirtualMachine(id: string): void {
    this.router.navigate(['/machines/edit', id]);
  }

  askDeleteConfirmation(id: string, name: string): void {
    this.confirmService.askDelete(id, name);
  }

  confirmDelete(): void {
    const id = this.confirmService.confirmDeleteId();
    if (!id) return;

    this.service
      .deleteVirtualMachine(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.virtualMachines = this.virtualMachines.filter(
            (machine) => machine.id !== id
          );
          this.confirmService.showAlert(
            'Máquina virtual excluída com sucesso!',
            'success'
          );
          this.confirmService.resetConfirmation();
        },
        error: () => {
          this.confirmService.showAlert(
            'Não foi possível excluir a máquina virtual.',
            'danger'
          );
          this.confirmService.resetConfirmation();
        },
      });
  }

  cancelDelete(): void {
    this.confirmService.resetConfirmation();
  }

  askChangeStatusConfirmation(id: string, newStatus: Status): void {
    this.confirmService.askStatusChange(id, newStatus);
  }

  confirmChangeStatus(): void {
    const id = this.confirmService.confirmStatusId();
    const newStatus = this.confirmService.confirmStatusNew();

    if (!id || !newStatus) return;

    this.service
      .updateVirtualMachineStatus(id, newStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (machineUpdated) => {
          const index = this.virtualMachines.findIndex(
            (machine) => machine.id === id
          );
          if (index > -1) {
            this.virtualMachines[index] = machineUpdated;
          }
          this.confirmService.showAlert(
            `Status da máquina alterado para ${newStatus}!`,
            'success'
          );
          this.confirmService.resetConfirmation();
        },
        error: () => {
          this.confirmService.showAlert(
            'Não foi possível alterar o status da máquina virtual.',
            'danger'
          );
          this.confirmService.resetConfirmation();
        },
      });
  }

  cancelChangeStatus(): void {
    this.confirmService.resetConfirmation();
  }

  shouldShowAlert(): boolean {
    return (
      !!this.alertMessage && !this.confirmDeleteId && !this.confirmStatusId
    );
  }
}
