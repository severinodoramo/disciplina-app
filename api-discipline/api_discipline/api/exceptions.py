class JsonError(Exception):
    status_code: int = None
    error: str = None

    def __init__(self, detail: str = None, code: int = None):
        super().__init__(detail, code)
        self.detail = detail

    def __getitem__(self, key: str):
        if key == "status_code":
            return self.status_code

        if key == "error":
            return self.error

        if key == "detail":
            return self.detail

        raise KeyError(f"Unknown key: {key}")


class JsonValidationError(JsonError):
    status_code = 400
    error = "Erro de validação"


class JsonPermissionError(JsonError):
    status_code = 403
    error = "Erro de permissão"


class JsonInternalServerError(JsonError):
    status_code = 500
    error = "Erro do servidor"


class JsonNotFoundError(JsonError):
    status_code = 404
    default_message = "Não encontrado"
