# Gerenciador de Projetos - Fullstack

Este é um projeto onde usuários podem ter um gerenciador de projetos, que permite aos usuários criar, editar e gerenciar projetos e tarefas.

## Front-end

Documentação do front-end: [readme](/frontend/README.md)

#### tecnologias

- Angular v18
- Typescript
- RxJS
- PrimeNG
- PrimeFlex
- PrimeIcons

## Back-end

Documentação do back-end: [readme](/backend/README.md)

#### tecnologias

- Fastify
- Prisma ORM
- Typescript
- Fastify Type Provider Zod
- JWT (Json Web Token)
- Nodemailer
- Zod
- Bcript
- Dayjs
- Dotenv
- Tsx

## Diagrama de entidade relacionamento

Tabelas: Users, Projects, UsersOnProjects, Tasks, UserInvitation, TaskStatus, TaskPriority, Role.

- O Users salva os usuários cadastrados no sistema que finalizaram o cadastro.
- O UsersOnProjects associa um usuário a um projeto e tem informações únicas para esse relacionamento.
- O Projects salva os projetos e tem associado zero ou mais tarefas.
- A Tasks salva as tarefas e está associado a somente um projeto
- A UserInvitation salva os usuários que foram convidados por outros usuários e que precisam finalizar o cadastro
- A TaskStatus são associadas as tarefas para definir o status.
- A TaskPriority são associadas as tarefas para definir a prioridade.
- A Role são associadas aos usuários e usersOnProjects (definir o acesso a um projeto).

diagrama da modelagem: [diagrama](./backend/diagrama.jpeg)

## Requisitos Funcionais

### Autenticação de Usuário

- O sistema deve permitir que os usuários se cadastrem, façam login e logout.
- O usuário deve poder redefinir a senha através de e-mail.

### Criação de Projetos

- O usuário deve ser capaz de criar, editar e excluir projetos.
- Cada projeto deve ter um nome, descrição e data de início e término.

### Gestão de Tarefas

- O usuário deve ser capaz de criar, editar, excluir e visualizar tarefas dentro de cada projeto.
- As tarefas devem ter título, descrição, prazo, status (por fazer, em andamento, concluída) e prioridade (baixa, média, alta).

### Atribuição de Tarefas

- As tarefas devem poder ser atribuídas a diferentes usuários dentro do projeto.
- Notificações (e-mail ou dentro do sistema) devem ser enviadas quando uma tarefa for atribuída ou modificada.

### Comentários em Tarefas

- Os usuários devem poder comentar em cada tarefa para discutir detalhes ou atualizações.

### Rastreamento de Progresso

- O sistema deve mostrar o progresso do projeto com base nas tarefas concluídas (ex: gráfico de progresso ou barra de status).

### Filtros e Pesquisa

- O usuário deve poder filtrar as tarefas por status, prioridade ou prazo.
- Deve existir uma função de pesquisa para encontrar tarefas ou projetos rapidamente.

### Dashboard Resumido

- O sistema deve fornecer uma visão geral dos projetos e tarefas no dashboard, com visualização de prazos críticos e tarefas atrasadas.

### Relatórios de Progresso

- Deve ser possível gerar relatórios de progresso de um projeto (quantas tarefas foram concluídas, quantas estão atrasadas, etc.).
