# atribuindo a versão do node para a imagem
FROM node:20.9.0

# copiando pasta e arquivos do projeto para dentro do container no diretório /app
COPY src /app/src
COPY prisma /app/prisma
COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app
COPY .env /app

# definindo o diretório de trabalho que serão executados os comandos em seguida
WORKDIR "/app"

# instalando as dependências do projeto e gerando o build do projeto
RUN ls -la && npm ci && npm run server:build

# expondo a porta 3000 do container
EXPOSE 3000

# comando que será executado ao iniciar o container
CMD ["npm", "run", "server:start"]

