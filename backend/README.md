# Gerenciador de Tarefas - Back-end

## Estrutura de pastas do projeto

- libraries: bibliotecas utilizadas no projeto e centralizadas
- enums: enums utilizados na aplicação
- middlewares: mediadores para realizar verificações antes de chegar as rotas.
- repositories: classes disponíveis com métodos prontos para interagir com o banco
- routes: rotas cadastradas
- controllers: classes disponíveis para interagir com as rotas cadastradas.
- templates: guarda os templates de e-mails
- services: serviços necessários para realizar alguma operação

Este projeto é uma aplicação Node.js escrita em TypeScript. Siga os passos abaixo para configurar e executar o projeto.

- A parte de envio de e-mails com o nodemailer é criada para fins de teste somente.

## Tecnologias utilizadas

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
- TSX

## Pré-requisitos

- Node.js (versão 14.x ou superior)
- npm (versão 6.x ou superior)

## Instalação

1. **Clone o repositório:**

```sh
git clone https://github.com/BernardoSemiOficial/gerenciador-de-projetos-fullstack.git
cd backend
```

2. **Instale as dependências:**

```sh
npm install
```

3. **Executando o Projeto**

Para executar o projeto em modo de desenvolvimento, use o seguinte comando:

```sh
npm run server:watch
```

## Prisma

O prisma orm foi utilizado para interagir com o banco de dados relacionado SQLite. Para rodar o prisma studio e conseguir visualizar os dados presentes no banco, rode:

```sh
npm run prima:studio
```

- criar migrations
  As migrations são um processo para guardar as alterações realizadas em nossas tabelas e deixar isso registrado através arquivos .sql. Cada migration possui uma pasta com nome que representa aquela modificações. Ao acessar a pasta backend/prisma/migrations verá que temos algumas pastas que possuem nomes como esse: 20240828214046_create_trips_table e que possui um id e o nome dado no momento da criação da migration.

O comando para criar uma nova migration no prisma é npx prisma migrate dev ou do comando registrado no package.json prisma:migrate. Esse comando irá perguntar qual será o nome da migration que representa aquelas alterações

## Scripts disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

- `server:build`: Executa o build do projeto de typescript para javascript,
- `server:watch`: Executa o servidor localmente com hot-reloading.
- `prisma:studio`: Executa o Prisma Studio, podendo consultar os dados salvos.
- `prisma:migrate`: Executa a criação de uma migration,
- `prisma:seed`: Executa o processo de população de dados no banco de forma automática
