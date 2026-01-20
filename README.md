# 📘 Sistema de Blogging - API REST

> Projeto desenvolvido como requisito para a Pós-Graduação em Full Stack Development.

## 📖 Sobre o Projeto

Este projeto consiste no backend de uma plataforma de blog. O sistema foi projetado para atender duas personas principais: **Alunos**, que podem ler e buscar postagens, e **Docentes**, que possuem permissão para gerenciar o conteúdo (criar, editar e excluir posts).

A aplicação segue os princípios da arquitetura REST, utiliza Docker para containerização e possui pipeline de CI/CD configurado via GitHub Actions.

---

## 🏗 Arquitetura

A aplicação foi estruturada seguindo o padrão **MVC (Model-View-Controller)** adaptado para APIs (sem a camada de View, retornando JSON), garantindo a separação de responsabilidades.

- **Node.js & Express:** Responsáveis pelo servidor, roteamento e middlewares.
- **Persistência de Dados:** Banco de dados para armazenamento das postagens.
- **Docker:** Utilizado para criar ambientes isolados e reprodutíveis (Desenvolvimento e Produção).
- **GitHub Actions:** Automação de testes e verificação de build a cada push.

---

## 🚀 Tecnologias Utilizadas

- **Linguagem:** JavaScript (Node.js) / Typescript
- **Framework:** Express
- **Banco de Dados:** PostgreSQL
- **DevOps:** Docker, Docker Compose
- **CI/CD:** GitHub Actions

---

## 📦 Como Executar

### Pré-requisitos

- [Git](https://git-scm.com)
- [Docker](https://www.docker.com/) & Docker Compose

### Passo a Passo

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/bl-comunicacao/blogging.git
    cd blogging
    ```

2.  **Configure as Variáveis de Ambiente (Opcional)**
    As variáveis de ambiente já estão configuradas no `docker-compose.yml`. 
    Se quiser personalizar, crie um arquivo `.env` na raiz do projeto (veja `env.example` como referência):
    ```
    DB_HOST=postgres
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_NAME=blog
    PORT=3000
    NODE_ENV=development
    ```
    **Nota:** O arquivo `.env` é opcional. O projeto funciona sem ele usando as configurações padrão do docker-compose.

3.  **Execute com Docker Compose**
    Este comando irá construir a imagem da aplicação e subir o container do banco de dados.
    ```bash
    docker-compose up --build
    ```

4.  **Acesse a API**
    O servidor estará rodando em: `http://localhost:3000`

---

## 🐳 Publicar Imagem no Docker Hub

Para publicar a imagem da aplicação no Docker Hub, siga os passos abaixo:

### Pré-requisitos

- Conta no [Docker Hub](https://hub.docker.com/) (crie uma se não tiver)
- Docker instalado e rodando

### Passo a Passo

1. **Faça login no Docker Hub**
   ```bash
   docker login
   ```
   Digite seu username e password quando solicitado.

2. **Construa a imagem com uma tag apropriada**
   
   A tag deve seguir o formato: `seu-usuario/nome-da-imagem:versao`
   
   ```bash
   docker build -t seu-usuario/blogging-api:latest .
   ```
   
   Ou com uma versão específica:
   ```bash
   docker build -t seu-usuario/blogging-api:v1.0.0 .
   ```

3. **Verifique se a imagem foi criada**
   ```bash
   docker images
   ```

4. **Faça o push da imagem para o Docker Hub**
   ```bash
   docker push seu-usuario/blogging-api:latest
   ```
   
   Ou para uma versão específica:
   ```bash
   docker push seu-usuario/blogging-api:v1.0.0
   ```

5. **Verifique no Docker Hub**
   Acesse `https://hub.docker.com/r/seu-usuario/blogging-api` para confirmar que a imagem foi publicada.

### Exemplo Completo

```bash
# 1. Login
docker login

# 2. Build da imagem
docker build -t raphaelalves/blogging-api:latest .

# 3. Push para o Docker Hub
docker push raphaelalves/blogging-api:latest
```

### Usando a Imagem Publicada

Depois de publicada, qualquer pessoa pode usar sua imagem com:

```bash
docker pull seu-usuario/blogging-api:latest
docker run -p 3000:3000 seu-usuario/blogging-api:latest
```

### Scripts Automatizados

Para facilitar o processo, o projeto inclui scripts que automatizam o build e push:

**PowerShell (Windows):**
```powershell
.\docker-push.ps1 -username seu-usuario -tag latest
```

**Bash (Linux/Mac/WSL):**
```bash
chmod +x docker-push.sh
./docker-push.sh seu-usuario latest
```

**Nota:** Substitua `seu-usuario` pelo seu username do Docker Hub em todos os comandos.

---

## ☁️ Deploy no Render

O projeto está configurado para deploy no [Render](https://render.com/). Siga os passos abaixo:

### Pré-requisitos

- Conta no [Render](https://render.com/)
- Repositório Git (GitHub, GitLab ou Bitbucket) conectado ao Render

### Passo a Passo

#### Opção 1: Usando render.yaml (Recomendado)

1. **Conecte seu repositório ao Render**
   - Acesse o [Dashboard do Render](https://dashboard.render.com/)
   - Clique em "New +" → "Blueprint"
   - Conecte seu repositório Git
   - O Render detectará automaticamente o arquivo `render.yaml`

2. **O Render criará automaticamente:**
   - Um serviço Web (API)
   - Um banco de dados PostgreSQL
   - As variáveis de ambiente necessárias

3. **Aguarde o deploy**
   - O Render fará o build e deploy automaticamente
   - Você receberá uma URL como: `https://seu-app.onrender.com`

#### Opção 2: Configuração Manual

1. **Crie um banco PostgreSQL**
   - No Dashboard do Render, clique em "New +" → "PostgreSQL"
   - Escolha o plano (Free disponível)
   - Anote as credenciais do banco

2. **Crie um serviço Web**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório Git
   - Configure:
     - **Name:** `blogging-api`
     - **Environment:** `Node`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Configure as Variáveis de Ambiente**
   - Na seção "Environment" do serviço web:
     - `NODE_ENV` = `production`
     - `PORT` = `3000` (ou deixe vazio, o Render define automaticamente)
     - Conecte o banco PostgreSQL criado (o Render criará automaticamente a `DATABASE_URL`)

4. **Deploy**
   - Clique em "Create Web Service"
   - O Render fará o build e deploy automaticamente

### Variáveis de Ambiente no Render

O Render fornece automaticamente:
- `DATABASE_URL` - Quando você conecta um banco PostgreSQL ao serviço
- `PORT` - Porta onde a aplicação deve escutar (definida automaticamente)

**Importante:** A aplicação está configurada para:
- ✅ Escutar em `0.0.0.0` (necessário no Render)
- ✅ Usar SSL na conexão PostgreSQL (obrigatório no Render)
- ✅ Suportar `DATABASE_URL` ou variáveis individuais

### Verificando o Deploy

Após o deploy, você pode:
- Acessar a API: `https://seu-app.onrender.com`
- Acessar a documentação Swagger: `https://seu-app.onrender.com/api-docs`
- Testar os endpoints conforme documentado

### Troubleshooting

**Erro de conexão com o banco:**
- Verifique se o banco PostgreSQL está conectado ao serviço web
- Confirme que a variável `DATABASE_URL` está configurada

**Build falha:**
- Verifique os logs no Dashboard do Render
- Confirme que o TypeScript está compilando corretamente

**Aplicação não inicia:**
- Verifique se o servidor está escutando na porta correta
- Confirme que todas as variáveis de ambiente estão configuradas

---

## ✅ Fluxo Correto de Execução e Testes

1. Subir os containers
docker-compose up --build

2. Verificar containers
docker ps

3. Acessar Swagger
http://localhost:3000/api-docs

4. Testar endpoints no Swagger
POST /posts
GET /posts
GET /posts/{id}
PUT /posts/{id}
DELETE /posts/{id}

5. Executar testes unitários
docker exec -it post-api npm run test

6. Executar testes de integração
docker exec -it post-api npm run test:integration

---

## 🧪 Testes Automatizados

Testes Unitários:
Validam funções e regras de negócio isoladamente.

Execução:
docker exec -it post-api npm run test

Testes de Integração:
Validam rotas, banco de dados e fluxo completo da aplicação.

Execução:
docker exec -it post-api npm run test:integration

---

## 🔌 Documentação da API

Abaixo estão descritos os endpoints disponíveis na aplicação.

### 🔍 Endpoints Públicos (Alunos)

| Método | Rota | Descrição | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/posts` | Lista todas as postagens recentes. | N/A |
| `GET` | `/posts/:id` | Exibe o conteúdo completo de um post. | **:id** (ID do post na URL) |
| `GET` | `/posts/search` | Busca posts por palavra-chave. | **?q=termo** (Query String) |

### 🔐 Endpoints Administrativos (Docentes)

| Método | Rota | Descrição | Corpo da Requisição (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/posts` | Cria uma nova postagem. | `{ "title": "...", "content": "...", "author": "..." }` |
| `PUT` | `/posts/:id` | Atualiza uma postagem existente. | `{ "title": "Novo Título", "content": "Novo Texto", "author": "Novo autor" }` |
| `DELETE`| `/posts/:id` | Remove uma postagem do sistema. | N/A |

#### Exemplo de Payload (POST /posts)
```json
{
  "title": "A Importância da Containerização",
  "content": "Docker permite que desenvolvedores empacotem aplicações...",
  "author": "Prof. Bruno Lopes"
}

📝 Relato de Experiências e Desafios
Durante o ciclo de desenvolvimento deste projeto, a equipe enfrentou e superou diversos desafios técnicos e organizacionais:

Orquestração de Containers: Um dos principais desafios foi garantir a comunicação correta entre o container da aplicação (Node.js) e o container do Banco de Dados. Foi necessário implementar estratégias de healthcheck e dependency order no docker-compose para evitar que a aplicação tentasse conectar antes do banco estar pronto.

Implementação da Busca Textual: Desenvolver a lógica do endpoint /posts/search exigiu um estudo sobre como realizar consultas performáticas no banco de dados escolhido (utilizando operadores como LIKE em SQL ou $regex em NoSQL) para filtrar títulos e conteúdos simultaneamente.

Fluxo de CI/CD: A configuração do GitHub Actions foi um aprendizado valioso. Tivemos que configurar o arquivo YAML para garantir que, a cada push, o ambiente fosse montado virtualmente para rodar os testes de integração, garantindo a qualidade do código entregue.

👨‍💻 Autores
Trabalho desenvolvido pela equipe:

- Matheus Faias
- Bruno Lopes
- Raphael Alves
- Emanuel Moraes
