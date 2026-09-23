# Atividade Somativa 2 - Tecnologias para Desenvolvimento Web

Projeto desenvolvido para a disciplina de **Tecnologias para Desenvolvimento Web**, do curso de **Análise e Desenvolvimento de Sistemas**.

A aplicação foi construída em **React** e possui três páginas principais: **Cadastro**, **Login** e **Principal**, utilizando **React Router DOM** para navegação, **Firebase Authentication** para autenticação de usuários e **Cloud Firestore** para armazenamento dos dados complementares.

---

## Funcionalidades

### Cadastro

A página de cadastro permite informar:

- E-mail
- Senha
- Nome
- Sobrenome
- Data de nascimento

Ao realizar o cadastro:

1. O usuário é criado no **Firebase Authentication** utilizando e-mail e senha.
2. O UID gerado pelo Firebase é utilizado como identificador do documento no Firestore.
3. Os dados complementares do usuário são armazenados na coleção `usuarios`.

Dados armazenados no Firestore:

    uid
    email
    nome
    sobrenome
    nascimento

---

### Login

A página de login possui:

- Campo de e-mail
- Campo de senha
- Botão de acesso

Os dados são validados utilizando o **Firebase Authentication**.

Quando a autenticação é realizada com sucesso, o usuário é direcionado para a página **Principal**.

Caso os dados estejam incorretos ou o usuário não esteja cadastrado, uma mensagem de erro é apresentada na tela.

---

### Página Principal

A página Principal é acessada após a autenticação.

A aplicação utiliza o UID do usuário autenticado para localizar seu documento correspondente no Firestore.

São exibidas as seguintes informações:

- Nome
- Sobrenome
- Data de nascimento

A página também possui a opção de encerrar a sessão do usuário.

---

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- React Router DOM
- Firebase Authentication
- Cloud Firestore
- HTML5
- CSS3
- Git
- GitHub
- Netlify

---

## Estrutura do projeto

    somativa-2-react/
    │
    ├── public/
    │   └── _redirects
    │
    ├── src/
    │   ├── paginas/
    │   │   ├── Cadastro/
    │   │   │   └── index.jsx
    │   │   │
    │   │   ├── Login/
    │   │   │   └── index.jsx
    │   │   │
    │   │   └── Principal/
    │   │       └── index.jsx
    │   │
    │   ├── App.jsx
    │   ├── Firebase.js
    │   ├── index.css
    │   ├── main.jsx
    │   └── rotas.jsx
    │
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── vite.config.js

---

## Rotas

As rotas da aplicação são definidas separadamente no arquivo:

    src/rotas.jsx

Rotas disponíveis:

| Rota | Página |
|---|---|
| `/` | Login |
| `/cadastro` | Cadastro |
| `/principal` | Principal |

---

## Firebase

O projeto utiliza dois serviços do Firebase.

### Firebase Authentication

Responsável pelo cadastro e autenticação dos usuários utilizando:

    E-mail + Senha

### Cloud Firestore

Responsável pelo armazenamento das informações complementares do usuário.

Estrutura utilizada:

    usuarios
    └── UID_DO_USUARIO
        ├── uid
        ├── email
        ├── nome
        ├── sobrenome
        └── nascimento

O UID gerado pelo Firebase Authentication é utilizado como identificador do documento no Firestore.

---

## Regras do Firestore

As regras utilizadas permitem que cada usuário autenticado acesse apenas seu próprio documento:

    rules_version = '2';

    service cloud.firestore {
      match /databases/{database}/documents {

        match /usuarios/{userId} {
          allow read, write:
            if request.auth != null
            && request.auth.uid == userId;
        }

      }
    }

---

## Como executar o projeto

### 1. Clonar o repositório

    git clone https://github.com/g00zy/somativa-2-react.git

### 2. Acessar a pasta do projeto

    cd somativa-2-react

### 3. Instalar as dependências

    npm install

### 4. Executar o projeto

    npm run dev

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

    http://localhost:5173

---

## Build

Para gerar a versão de produção:

    npm run build

O Vite criará a pasta:

    dist/

com os arquivos otimizados para produção.

---

## Deploy

O projeto pode ser hospedado no **Netlify**.

Configuração utilizada:

    Build command:
    npm run build

    Publish directory:
    dist

Como a aplicação utiliza React Router, foi criado o arquivo:

    public/_redirects

com o conteúdo:

    /* /index.html 200

Isso permite que rotas como `/cadastro` e `/principal` funcionem corretamente quando acessadas diretamente em produção.

---

## Dependências

As dependências do projeto podem ser consultadas no arquivo:

    package.json

As principais são:

    react
    react-dom
    react-router-dom
    firebase

---

## Observações

A pasta `node_modules` não faz parte do repositório e não deve ser incluída no arquivo ZIP de entrega.

As dependências podem ser recriadas executando:

    npm install

A pasta `dist` também pode ser recriada a qualquer momento executando:

    npm run build

---

## Autor

**Gabriel Mansano**

Curso de Análise e Desenvolvimento de Sistemas  
PUCPR