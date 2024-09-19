from django.db.models import Model
from api.transports import BaseResponseTransport
from api.exceptions import JsonNotFoundError


class BaseRepository:
    model: Model

    def make_transport(self, instance: Model) -> BaseResponseTransport:
        pass

    def get_all(self) -> list[Model]:
        return list(self.model.objects.all())

    def get_by_id(self, id: int) -> Model:
        try:
            instance = self.model.objects.get(id=id)
        except self.model.DoesNotExist:
            raise JsonNotFoundError(f"{self.model._meta.verbose_name} não encontrado")
        return instance
