# Gerenciador de Tarefas - Front-end

O projeto é constituido ao menos 5 features. Dashboard, invititation, login, projects e register.

O dashboard é a parte da aplicação onde é listado os projetos que o usuário possui acesso. Nessa tela é possível também convidar novos usuários para os projetos que ele possuí acesso.

O invitation é parte da aplicação onde é feito a finalização do cadastro para aqueles usuários que não possuem conta previamente cadastrada. Os usuário recebem um e-mail para ser redicionado para essa parte.

O login é a parte da aplicação onde o usuário se autentica para conseguir acessar o sistema, caso tenha um conta previamente cadastrada.

O register é a parte da aplicação onde o usuário se cadastra na plataforma com nome, email e senha, e consegue se acessar o sistema logo em seguida.

O projects é a parte da aplicação onde consegue manipular seus projetos e tarefas. Então, é possível visualizar o detalhe do projeto, editar e excluir, além disso, ele consegue visualizar suas tarefas e criar novas. Nessa listagem de tarefas, é possível ver o detalhe de cada tarefa clicando no botão de "view" e assim fazer a edição das informações contidas na tarefa.

## Organização de pastas do projeto

O projeto foi organizado baseado em um artigo do medium chamado de ["How to Structure Angular Apps in 2021"](https://javascript.plainenglish.io/how-to-structure-angular-apps-in-2021-a0bdd481ad0d) e escrito pelo Touhid Rahman.

Resumidamente o projeto foi dividido em 4 partes:

- core (parte estrutural do projeto, com guarda de rotas, interceptors, interfaces, services e enums)
- features (parte da regra de negócio separada por contexto)
- pages (componente específicos para lidar como páginas, livre de lógica complexa e que importam as features)
- shared (componentes utilizados globalmente, mas abstraidos de bibliotecas)

## Tecnologias

- Angular v18
- Typescript
- RxJS
- PrimeNG
- PrimeFlex
- PrimeIcons

## Como rodar o projeto

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [https://nodejs.org](https://nodejs.org).

2. Abra o terminal e navegue até o diretório raiz do projeto.

3. Execute o seguinte comando para instalar as dependências do projeto:

```
npm install
```

4. Após a instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento:

```
ng serve
```

5. Abra o navegador e acesse [http://localhost:4200](http://localhost:4200) para visualizar o projeto em execução.

6. Pronto! Agora você pode explorar o Gerenciador de Tarefas em seu ambiente local.
