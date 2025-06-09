
export interface VirtualMachine {
  id: string;
  nome: string;
  cpu: number;
  memoria: number;
  disco: number;
  dataDeCriacao: string;
  status: 'START' | 'STOP' | 'SUSPEND';
}


export interface TaskLog {
  id: string;
  usuario: string;
  dataHora: string;
  nomeMaquinaVirtual: string;
  acao: string;
}
