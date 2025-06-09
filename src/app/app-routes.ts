import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
   { path: '', redirectTo: '/machines', pathMatch: 'full' },

  {
    path: 'machines',
    loadComponent: () =>
      import('./components/virtual-machine-list/maquina-virtual-lista/virtual-machine-list/maquina-virtual-lista.component')
        .then(m => m.MaquinaVirtualListaComponent)
  },
  {
    path: 'machines/new',
    loadComponent: () =>
      import('./components/virtual-machine-list/maquina-virtual-lista/virtual-machine-form/virtual-machine-form.component')
        .then(m => m.VirtualMachineFormComponent)
  },
  {
    path: 'machines/edit/:id',
    loadComponent: () =>
      import('./components/virtual-machine-list/maquina-virtual-lista/virtual-machine-form/virtual-machine-form.component')
        .then(m => m.VirtualMachineFormComponent)
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/virtual-machine-list/maquina-virtual-lista/task-log-list/task-log-list/task-log-list.component')
        .then(m => m.TaskLogListComponent)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
