# Desafio Técnico 2 - API RESTful de Autenticação

Este projeto é uma API RESTful para autenticação de usuários, conforme especificado no Desafio Técnico 2. A API permite operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

## Especificações Técnicas

- **Formato de Comunicação:** Todos os endpoints aceitam e retornam dados no formato JSON.
- **Persistência de Dados:** Armazenamento persistente de dados do usuário usando MongoDB.
- **Respostas de Erro:** Formato padrão: `{ "mensagem": "mensagem de erro" }`

## Endpoints

1. **Sign Up (Criação de Cadastro)**
   - **URL:** `/auth/signup`
   - **Método:** `POST`
   - **Input:**
     ```json
     {
       "nome": "string",
       "email": "string",
       "senha": "senha",
       "telefones": [{"numero": "123456789", "ddd": "11"}]
     }
     ```
   - **Output (Sucesso):**
     ```json
     {
       "id": "GUID/ID",
       "data_criacao": "data",
       "data_atualizacao": "data",
       "ultimo_login": "data",
       "token": "GUID/JWT"
     }
     ```
   - **Erro:**
     ```json
     { "mensagem": "E-mail já existente" }
     ```

2. **Sign In (Autenticação)**
   - **URL:** `/auth/signin`
   - **Método:** `POST`
   - **Input:**
     ```json
     {
       "email": "string",
       "senha": "senha"
     }
     ```
   - **Output:**
     ```json
     {
       "id": "GUID/ID",
       "data_criacao": "data",
       "data_atualizacao": "data",
       "ultimo_login": "data",
       "token": "GUID/JWT"
     }
     ```
   - **Erros:**
     ```json
     { "mensagem": "Usuário e/ou senha inválidos" }
     ```

3. **Buscar Usuário**
   - **URL:** `/user`
   - **Método:** `GET`
   - **Requisição:** Header Authentication com valor "Bearer {token}"
   - **Erros:**
     ```json
     { "mensagem": "Não autorizado" }
     { "mensagem": "Sessão inválida" }
     ```

## Configuração do Projeto

1. **Instalação:**
   ```bash
   npm install
   ```

2. **Configuração do Banco de Dados:**
   - Certifique-se de ter o MongoDB instalado e em execução.
   - Verifique a URL de conexão em `index.js` e ajuste conforme necessário.

3. **Execução:**
   ```bash
   npm start
   ```

## Requisitos e Desejáveis

- Persistência de dados usando MongoDB.
- Sistema de build com gerenciamento de dependências.
- Task runner para build.
- Padronização de estilo (ex: jsHint/jsLint).
- Framework: Express, Hapi, ou similar.
- JWT como token.
- Testes unitários.
- Criptografia hash na senha e token.
