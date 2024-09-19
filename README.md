Aqui está um `README.md` atualizado para o seu projeto, considerando os dois diretórios (`api-discipline` e `disciplina-app`), onde o arquivo `docker-compose.yml` está localizado dentro de `api-discipline`. 

---

# Projeto Disciplina: Next.js com Backend e Banco de Dados Dockerizados

Este repositório contém dois componentes principais do projeto:

- **disciplina-app**: O frontend da aplicação, construído com **Next.js**.
- **api-discipline**: O backend da aplicação, que roda dentro de um container Docker junto com o banco de dados.

## Estrutura do Projeto

- `disciplina-app/`: Contém o código do frontend em Next.js.
- `api-discipline/`: Contém o código do backend e o arquivo `docker-compose.yml` para configurar o backend e o banco de dados no Docker.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** (versão 14.x ou superior)
- **NPM** (ou Yarn)
- **Docker** (para rodar o backend e o banco de dados)

### Instalando Docker (caso ainda não tenha)

#### Windows e MacOS

1. Baixe e instale o **Docker Desktop**:  
   [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Siga as instruções de instalação de acordo com o seu sistema operacional.
3. Inicie o **Docker Desktop** e verifique se o Docker está rodando.

#### Linux

1. Execute os comandos abaixo para instalar o Docker:
   ```bash
   sudo apt-get update
   sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   sudo systemctl status docker
   ```

## Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar as Dependências

#### Frontend (Next.js)

Navegue até o diretório `disciplina-app` e instale as dependências do frontend:

```bash
cd disciplina-app
npm install
```

#### Backend (API)

O backend e o banco de dados estão configurados para rodar em containers Docker. Para isso, vamos usar o `docker-compose.yml` localizado na pasta `api-discipline`.

### 3. Configurar e Iniciar os Containers do Backend

Navegue até o diretório `api-discipline`:

```bash
cd ../api-discipline
```

Construa e inicie os containers Docker para o backend e o banco de dados:

```bash
docker-compose up --build
```

Este comando:

- Constrói a imagem do backend.
- Baixa e inicia a imagem do banco de dados especificado no `docker-compose.yml`.
- Inicia os containers.

## Executando o Frontend (Next.js)

1. Navegue de volta para o diretório `disciplina-app`:

```bash
cd ../disciplina-app
```
2. Duplique o arquivo `.env.local.template`, em seguida renomeie a cópia para que fique apenas como `.env.local`

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse o frontend em seu navegador:

```
http://localhost:3000/login
```

O backend estará rodando no Docker, enquanto o frontend estará rodando localmente. O frontend se comunica com o backend via as URLs configuradas nas variáveis de ambiente.

## Parando os Containers

Para parar os containers Docker do backend e banco de dados, execute o seguinte comando dentro da pasta `api-discipline`:

```bash
docker-compose down
```