export type Status = 'START' | 'STOP' | 'SUSPEND';

const statusCycle: Record<Status, Status> = {
  START: 'STOP',
  STOP: 'SUSPEND',
  SUSPEND: 'STOP',
};

const statusButtonClass: Record<Status, string> = {
  START: 'btn-outline-warning',
  STOP: 'btn-outline-warning',
  SUSPEND: 'btn-outline-success',
};

const statusClass: Record<Status, string> = {
  START: 'bg-success',
  STOP: 'bg-danger',
  SUSPEND: 'bg-warning text-dark',
};

const statusActionLabel: Record<Status, string> = {
  START: 'Suspender',
  STOP: 'Suspender',
  SUSPEND: 'Iniciar',
};

const statusDisplayName: Record<Status, string> = {
  START: 'Iniciar',
  STOP: 'Parar',
  SUSPEND: 'Suspender',
};

export const getNextStatus = (current: Status): Status =>
  statusCycle[current] ?? 'START';

export const getStatusButtonClass = (status: Status): string =>
  statusButtonClass[status] ?? 'btn-outline-primary';

export const getStatusClass = (status: Status): string =>
  statusClass[status] ?? 'bg-secondary';

export const getStatusActionLabel = (status: Status): string =>
  statusActionLabel[status] ?? 'Alterar';

export const getStatusDisplayName = (status: Status | null): string =>
  status && statusDisplayName[status] ? statusDisplayName[status] : '';
