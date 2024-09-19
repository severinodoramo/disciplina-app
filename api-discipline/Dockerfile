FROM python:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instala dependências
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        libpq-dev \
        python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Instala Poetry
RUN pip install poetry

# Configura o diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências do Poetry
COPY poetry.lock pyproject.toml /app/

# Desativa a criação de virtualenvs pelo Poetry
RUN poetry config virtualenvs.create false

# Instala as dependências do projeto
RUN poetry install --no-interaction

RUN poetry add django-cors-headers

# Copia os arquivos do projeto
COPY . /app/

# Copia o script de entrada e define permissões de execução
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh