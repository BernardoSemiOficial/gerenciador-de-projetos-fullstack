# atribuindo a versão do node para a imagem
FROM node:20.9.0

# definindo o nome da imagem
LABEL name="gerenciador-de-projetos-backend"

# copiando pasta e arquivos do projeto para dentro do container no diretório /home/app
COPY . /home/app
# COPY prisma /home/app/prisma
# COPY package.json /home/app
# COPY package-lock.json /home/app
# COPY tsconfig.json /home/app
# COPY .env /home/app

# definindo o diretório de trabalho que serão executados os comandos em seguida
WORKDIR "/home/app"

# Diretórios e arquivos copiados para o container
RUN ls /home/app

# instalando as dependências do projeto e gerando o build do projeto
RUN npm ci && npm run server:build

# Diretórios e arquivos depois do build
RUN ls /home/app

# expondo a porta 3000 do container
EXPOSE 3000

# comando que será executado ao iniciar o container
CMD ["npm", "run", "server:start"]

