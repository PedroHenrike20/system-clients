# Cadastro de Clientes - Projeto em Angular

Este projeto é uma aplicação Angular desenvolvida na versão 15.2.11, utilizando PrimeNG para a interface e estruturada no formato de microfrontend. O projeto também suporta conteinerização com Docker.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados em sua máquina:

Node.js (versão recomendada: LTS)

Angular CLI

Docker

## Como rodar a aplicação

Rodando localmente (sem Docker)

1. Clone este repositório:
`git clone`


2. Acesse o diretório do projeto:
`cd projeto-clonado`


3. Instale as dependências:
`npm install`


4. Inicie o servidor de desenvolvimento:
`ng serve`


5. Acesse no navegador:
`http://localhost:4200/`

Rodando com Docker

1. Construa a imagem Docker:
`docker build -t meu-projeto-angular .`


2. Execute o container:


3. Acesse no navegador:
`http://localhost:4200/`

## Parando e removendo o container
Caso precise parar e remover o container:

# Parar o container
`docker stop projeto-angular-container`

# Remover o container
`docker rm projeto-angular-container`

## Construção e Deploy
Se deseja gerar uma build otimizada para produção, utilize o seguinte comando:

`ng build --prod`

Para rodar a versão de produção localmente, utilize um servidor como o `http-server`:

`npx http-server -p 8080 -c-1 dist/projeto`

E acesse:
`http://localhost:8080/`


