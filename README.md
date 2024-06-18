# Desafio Técnico - LuizaLabs

## Descrição

Este projeto consiste em um sistema para processar arquivos de pedidos desnormalizados e retornar um JSON normalizado via API REST. O sistema foi desenvolvido utilizando Node.js e segue os princípios da Clean Architecture e SOLID para garantir a manutenibilidade e escalabilidade do código.

## Escolhas Tecnológicas e Arquiteturais

### Tecnologias Utilizadas

- **Node.js**: Plataforma utilizada para a construção do servidor e processamento assíncrono.
- **Express**: Framework utilizado para a criação de rotas e middleware de forma simples e eficiente.
- **Multer**: Middleware utilizado para o processamento de uploads de arquivos.
- **Jest**: Framework de testes utilizado para garantir a qualidade do código.

### Padrões Arquiteturais

- **Clean Architecture**: Foi utilizada para manter o código organizado, separando responsabilidades em diferentes camadas:
  - **Controllers**: Responsáveis por receber as requisições HTTP e chamar os serviços apropriados.
  - **Services**: Contêm a lógica de negócios e orquestram chamadas ao repositório.
  - **Repositories**: Responsáveis pela persistência e recuperação de dados.
  - **Utils**: Funções auxiliares e parsing de arquivos.

## Configuração

1. Clonar o repositório
2. Instalar as dependências:
   ```bash
   npm install
3. Inicializar o projeto 
   ```bash
   npm start 
4. Geração de Swagger
   ```bash
   npm run swagger-autogen


