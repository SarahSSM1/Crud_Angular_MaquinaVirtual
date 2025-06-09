# Frontend - Gerenciador de Máquinas Virtuais

Este projeto representa a interface de usuário (frontend) para um sistema de gerenciamento de máquinas virtuais. Ele permite que os usuários interajam com o backend (desenvolvido em Spring Boot) por meio de uma aplicação Angular intuitiva e responsiva.

---

## 📋 Visão Geral

O frontend providencia uma experiência de usuário intuitiva para o gerenciamento de máquinas virtuais. Ele consome as APIs fornecidas pelo backend para exibir, criar, editar e excluir informações de VMs, além de monitorar o status de tarefas relacionadas.

---

## 🚀 Funcionalidades

- _Criação de Máquinas Virtuais_  
  Formulários para provisionar novas VMs com configurações personalizadas.

- _Listagem de Máquinas Virtuais_  
  Visualização tabular e detalhada de todas as VMs existentes.

- _Edição de Máquinas Virtuais_  
  Modificação dos detalhes e configurações de VMs.

- _Exclusão de Máquinas Virtuais_  
  Funcionalidade para remover VMs do sistema.

- _Monitoramento de Tarefas_  
  Exibição do progresso e status de operações assíncronas iniciadas pelo usuário.

---

## 🛠 Tecnologias Utilizadas

- _Angular_ – Framework para criação de SPAs modernas.
- _TypeScript_ – Superset de JavaScript com tipagem estática.
- _Node.js_ – Ambiente de execução JavaScript.
- _npm/Yarn_ – Gerenciadores de pacotes.

---

## ✅ Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado em sua máquina:

- _Node.js 18.x ou superior_  
  👉 [Download Node.js](https://nodejs.org/)

- _Angular CLI 17.x ou superior_  
   Instalação global via npm:

  ```bash
  npm install -g @angular/cli
  ```

# Instale as dependências
npm install

# Execute a aplicação Angular
ng serve



# Caso aconteça o erro:

# Erro: Módulo 'tslib' não pode ser encontrado

Esse erro ocorre quando o TypeScript precisa usar helpers auxiliares (funções internas para recursos como extends, async/await, etc), mas não encontra o pacote tslib instalado no projeto.

Isso acontece porque, para otimizar o código gerado, o TypeScript importa esses helpers do tslib. Se o pacote não estiver instalado, a compilação falha com essa mensagem.

# Como resolver:
Basta instalar o pacote tslib usando o gerenciador de pacotes:










yarn add tslib
