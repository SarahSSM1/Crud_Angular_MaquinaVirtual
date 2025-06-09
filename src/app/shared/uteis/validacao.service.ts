import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidacaoService {
  private fieldConfig: Record<string, { label: string; placeholder: string }> =
    {
      nome: { label: 'Nome', placeholder: 'Digite o nome da máquina virtual' },
      cpu: { label: 'CPU', placeholder: 'Quantidade de núcleos' },
      memoria: { label: 'Memória', placeholder: 'Memória em GB' },
      disco: { label: 'Disco', placeholder: 'Espaço em disco em GB' },
    };

  noNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? { hasNumber: true } : null;
  }

  getLabel(field: string): string {
    return this.fieldConfig[field]?.label || field;
  }

  getFieldPlaceholder(field: string): string {
    return this.fieldConfig[field]?.placeholder || '';
  }

  getErrorMessage(
    field: string,
    control: AbstractControl | null
  ): string | null {
    if (!control || !control.errors) return null;

    const label = this.getLabel(field);

    if (control.errors['required']) {
      return `${label} é obrigatório.`;
    }

    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `${label} deve ter pelo menos ${requiredLength} caracteres.`;
    }

    if (control.errors['min']) {
      return `${label} deve ser no mínimo ${control.errors['min'].min}.`;
    }

    if (control.errors['hasNumber']) {
      return `${label} não pode conter números.`;
    }

    return null;
  }
}
