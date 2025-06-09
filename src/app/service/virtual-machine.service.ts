import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VirtualMachine, TaskLog } from '../models/virtual-machine.model';

@Injectable({
  providedIn: 'root',
})
export class VirtualMachineService {

  private readonly apiUrl = 'http://localhost:8080/api';
  private readonly http = inject(HttpClient);

  getAllVirtualMachines(): Observable<VirtualMachine[]> {
    return this.http.get<VirtualMachine[]>(`${this.apiUrl}/virtual-machines`);
  }


  getVirtualMachineById(id: string): Observable<VirtualMachine> {
    return this.http.get<VirtualMachine>(`${this.apiUrl}/virtual-machines/${id}`);
  }

  createVirtualMachine(
    machine: Omit<VirtualMachine, 'id' | 'dataDeCriacao' | 'status'>
  ): Observable<VirtualMachine> {
    return this.http.post<VirtualMachine>(`${this.apiUrl}/virtual-machines`, machine);
  }

  updateVirtualMachine(
    id: string,
    machine: VirtualMachine
  ): Observable<VirtualMachine> {
    return this.http.put<VirtualMachine>(`${this.apiUrl}/virtual-machines/${id}`, machine);
  }

  deleteVirtualMachine(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/virtual-machines/${id}`);
  }

  updateVirtualMachineStatus(
    id: string,
    status: 'START' | 'STOP' | 'SUSPEND'
  ): Observable<VirtualMachine> {
    return this.http.patch<VirtualMachine>(
      `${this.apiUrl}/virtual-machines/${id}/status?status=${status}`,
      {}
    );
  }

  getAllTaskLogs(): Observable<TaskLog[]> {
    return this.http.get<TaskLog[]>(`${this.apiUrl}/task-logs`);
  }
}
