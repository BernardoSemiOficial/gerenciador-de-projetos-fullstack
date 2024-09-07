# Gerenciador de Projetos - Fullstack

Este é um projeto de um gerenciador de projetos fullstack, que permite aos usuários criar, editar e gerenciar projetos e tarefas.

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

- As tarefas devem poder ser atribuídas a diferentes usuários dentro do projeto (para equipes).
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

## Requisitos Não Funcionais

### Desempenho

- O sistema deve carregar as páginas em menos de 2 segundos em uma conexão de rede média (ex: 3G).
- Deve ser capaz de suportar múltiplas requisições simultâneas sem perda de desempenho significativo.

### Segurança

- Dados dos usuários (como senhas) devem ser armazenados de forma segura, utilizando criptografia (ex: bcrypt para senhas).
- Todas as interações sensíveis com o servidor devem ser protegidas via HTTPS.

### Usabilidade

- A interface deve ser amigável e intuitiva, permitindo que usuários novos possam entender e usar o sistema sem treinamento extensivo.
- A aplicação deve ser responsiva e funcionar bem em dispositivos móveis.

### Escalabilidade

- O sistema deve ser escalável para suportar um grande número de usuários simultaneamente e a adição de novos recursos no futuro.

### Manutenibilidade

- O código deve ser modular e bem documentado para facilitar a manutenção e adição de novas funcionalidades.
- Boas práticas de desenvolvimento devem ser seguidas, como uso de testes automatizados e versionamento de código.

### Disponibilidade

- O sistema deve ter alta disponibilidade, com tempo de inatividade mínimo (ex: 99.9% de uptime).

### Compatibilidade

- O sistema deve ser compatível com os principais navegadores (Chrome, Firefox, Edge, Safari).

### Conformidade

- O sistema deve seguir as leis de proteção de dados (ex: LGPD no Brasil) e privacidade do usuário.
