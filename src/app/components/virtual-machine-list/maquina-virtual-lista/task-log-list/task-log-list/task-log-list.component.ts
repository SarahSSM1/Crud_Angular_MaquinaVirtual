import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TaskLog } from 'src/app/models/virtual-machine.model';
import { VirtualMachineService } from 'src/app/service/virtual-machine.service';

@Component({
  standalone: true,
  selector: 'app-task-log-list',
  templateUrl: './task-log-list.component.html',
  styleUrls: ['./task-log-list.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class TaskLogListComponent implements OnInit, OnDestroy {
  taskLogs: TaskLog[] = [];
  isLoading: boolean = true;

  private destroy$ = new Subject<void>();
  public service: VirtualMachineService = inject(VirtualMachineService);

  ngOnInit(): void {
    this.loadTaskLogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTaskLogs(): void {
    this.isLoading = true;

    this.service
      .getAllTaskLogs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.taskLogs = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
}
