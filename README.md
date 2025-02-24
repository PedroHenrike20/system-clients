# Cadastro de Clientes - Projeto em Angular

Este projeto é uma aplicação Angular desenvolvida na versão 15.2.11, utilizando PrimeNG para a interface e estruturada no formato de microfrontend. O projeto também suporta conteinerização com Docker.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados em sua máquina:

- [Node.js](https://nodejs.org/) - Para rodar a aplicação localmente
- [Docker](https://www.docker.com/) - Para criar e rodar os contêineres Docker
- [Docker Compose](https://docs.docker.com/compose/) - Para orquestrar os contêineres Docker
- [Angular CLI](https://angular.io/cli) - Para rodar comandos do Angular

## Como rodar a aplicação

### Rodando localmente (sem Docker)

1. Clone este repositório:
`git clone https://github.com/PedroHenrike20/system-clients.git`


2. Acesse o diretório do projeto:
`cd caminho/projeto-clonado`


3. Instale as dependências:
`npm install`


4. Inicie o servidor de desenvolvimento:
`ng serve`


5. Acesse no navegador:
`http://localhost:4200/`

### Rodando com Docker 

1. Construa a imagem Docker:
`docker build -t system-clients .`


2. Execute o container:
`docker run -d -p 4200:4200 --name system-clients system-clients`


3. Acesse no navegador:
`http://localhost:4200/`

## Parando e removendo o container
Caso precise parar e remover o container:

### Parar o container
`docker stop nome-container`

### Remover o container
`docker rm nome-container`

## Rodando com Docker Compose

1. No diretório onde o arquivo docker-compose.yml está localizado, use o seguinte comando para construir as imagens e iniciar os contêineres:

`docker-compose up --build`

2. Após rodar o comando, você pode acessar a aplicação em `http://localhost:4200`, se estiver usando a configuração padrão para o Angular.

### Parar o container
`docker-compose down`

## Construção e Deploy
Se deseja gerar uma build otimizada para produção, utilize o seguinte comando:

`ng build --configuration=production`

Para rodar a versão de produção localmente, utilize um servidor como o `http-server`:

`npx http-server -p 8080 -c-1 dist/projeto`

E acesse:
`http://localhost:8080/`

## Link do projeto na vercel
- [Vercel](https://system-clients.vercel.app/)



