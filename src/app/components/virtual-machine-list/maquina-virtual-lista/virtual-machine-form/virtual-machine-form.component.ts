import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { VirtualMachineService } from 'src/app/service/virtual-machine.service';
import { VirtualMachine } from 'src/app/models/virtual-machine.model';
import { noNumbersValidator } from 'src/app/shared/uteis/mask';
import { CommonModule } from '@angular/common';
import { ValidacaoService } from 'src/app/shared/uteis/validacao.service';
import { AlertService } from 'src/app/shared/uteis/alert.service';

@Component({
  standalone: true,
  selector: 'app-virtual-machine-form',
  templateUrl: './virtual-machine-form.component.html',
  styleUrls: ['./virtual-machine-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class VirtualMachineFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private service = inject(VirtualMachineService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private validacaoService = inject(ValidacaoService);

  private destroy$ = new Subject<void>();

  fields: {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    suffix: string;
  }[] = [];

  form!: FormGroup;
  isEditMode = false;
  machineId: string | null = null;

  ngOnInit(): void {
    this.forms();
    this.fieldsConfig();
    this.paramsForm();
  }

  fieldsConfig() {
    const nomes = ['nome', 'cpu', 'memoria', 'disco'];
    this.fields = nomes.map((name) => ({
      name,
      label: this.validacaoService.getLabel(name),
      placeholder: this.validacaoService.getFieldPlaceholder(name),
      type: name === 'nome' ? 'text' : 'number',
      suffix: name === 'nome' ? ':' : name === 'cpu' ? ' (núcleos):' : ' (GB):',
    }));
  }

  forms() {
    this.form = this.fb.group({
      nome: [
        '',
        [Validators.required, Validators.minLength(5), noNumbersValidator()],
      ],
      cpu: [1, [Validators.required, Validators.min(1)]],
      memoria: [1, [Validators.required, Validators.min(1)]],
      disco: [10, [Validators.required, Validators.min(1)]],
    });
  }

  paramsForm(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.machineId = id;
            return this.service.getVirtualMachineById(id);
          }
          this.isEditMode = false;
          this.machineId = null;
          return of(null);
        })
      )
      .subscribe({
        next: (machine) => {
          if (machine) {
            this.form.patchValue(machine);
          }
        },
        error: () => {
          this.alertService.showAlert(
            'Não foi possível carregar a máquina virtual para edição.',
            'danger'
          );
          this.router.navigate(['/machines']);
        },
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.alertService.showAlert(
        'Por favor, preencha todos os campos corretamente.',
        'danger'
      );
      return;
    }

    const machineData = this.form.value;

    if (this.isEditMode && this.machineId) {
      const updatedMachine: VirtualMachine = {
        ...machineData,
        id: this.machineId,
        dataDeCriacao: '',
        status: 'STOP',
      };

      this.service
        .updateVirtualMachine(this.machineId, updatedMachine)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.alertService.showAlert(
              'Máquina virtual atualizada com sucesso!',
              'success'
            );
            setTimeout(() => this.router.navigate(['/machines']), 2000);
          },
          error: () => {
            this.alertService.showAlert(
              'Não foi possível atualizar a máquina virtual.',
              'danger'
            );
          },
        });
    } else {
      this.service
        .createVirtualMachine(machineData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.alertService.showAlert(
              'Máquina virtual criada com sucesso!',
              'success'
            );
            setTimeout(() => this.router.navigate(['/machines']), 2000);
          },
          error: () => {
            this.alertService.showAlert(
              'Não foi possível criar a máquina virtual.',
              'danger'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel() {
    this.router.navigate(['/machines']);
  }

  getField(field: string): AbstractControl | null {
    return this.form.get(field);
  }

  isInvalid(field: string): boolean {
    const control = this.getField(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(field: string): string | null {
    return this.validacaoService.getErrorMessage(field, this.getField(field));
  }
}
