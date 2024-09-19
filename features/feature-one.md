# Criar convite para novos usuário em projetos

- Criar a tabela de invite_users que terá os campos já citados e realizar o relacionamento com tabelas como user e project
- Criar a tabela de ROLE onde teremos os tipos de SUPERADMIN, ADMIN, CONTRIBUTOR.
- Alterar a tabela de users e adicionar o relacionamento com a tabela ROLE definindo o SUPERADMIN para mim

1. Ao convidar um novo usuário, ele já poderá existir cadastrado na base de usuários, então somente convidar para o projeto. Se não existir, então realizar o fluxo 2 em diante.

2. Criar uma nova tabela para armazenar os usuários convidados (com id do usuário que convidou, id do projeto que foi convidado, email do usuário convidado). Qualquer usuário convidado por um SUPERADMIN ou ADMIN deverá ser CONTRIBUTOR no projeto MAS terá role de ADMIN como usuário.

3. Utilizar o serviço de email mocado do nodemailer para enviar emails de teste para ser possível finalizar o cadastro do usuário convidado

4. Criar uma nova página para finalização de cadastro. Que será uma página parecida com a de registro, mas com informações detalhadas de quem convidou, os projetos que foi convidado e também, campos de email preenchido, name e password devem vir para preencher. Depois de preenchido deve redireonar para a tela de dashboard.
