import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskLogListComponent } from './task-log-list.component';
import { of, throwError } from 'rxjs';
import { VirtualMachineService } from 'src/app/service/virtual-machine.service';
import { TaskLog } from 'src/app/models/virtual-machine.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('TaskLogListComponent', () => {
  let component: TaskLogListComponent;
  let fixture: ComponentFixture<TaskLogListComponent>;
  let mockService: jasmine.SpyObj<VirtualMachineService>;

  const mockTaskLogs: TaskLog[] = [
    { id: 1, name: 'Log 1', status: 'OK' } as unknown as TaskLog,
    { id: 2, name: 'Log 2', status: 'FAIL' } as unknown as TaskLog
  ];

  beforeEach(waitForAsync(() => {
    mockService = jasmine.createSpyObj('VirtualMachineService', ['getAllTaskLogs']);

    TestBed.configureTestingModule({
      imports: [
        TaskLogListComponent,
        CommonModule,
        FormsModule,
        RouterModule
      ],
      providers: [
        { provide: VirtualMachineService, useValue: mockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLogListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task logs on init', () => {
    mockService.getAllTaskLogs.and.returnValue(of(mockTaskLogs));

    fixture.detectChanges();

    expect(component.taskLogs.length).toBe(2);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error in loading task logs', () => {
    mockService.getAllTaskLogs.and.returnValue(throwError(() => new Error('Erro de rede')));

    fixture.detectChanges();

    expect(component.taskLogs.length).toBe(0);
    expect(component.isLoading).toBeFalse();
  });
});

