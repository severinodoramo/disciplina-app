from django.db.models import Model
from django.db.transaction import atomic
from api.exceptions import JsonValidationError, JsonInternalServerError
from django.core.exceptions import ValidationError


class BaseService:
    model: Model

    def _save(self, instance: Model) -> Model:
        try:
            with atomic():
                instance.full_clean()
                instance.save()
        except ValidationError as ve:
            raise JsonValidationError(str(ve))
        except Exception as e:
            raise JsonInternalServerError(str(e))
        return instance

    def create(self, **kwargs) -> Model:
        instance = self.model(**kwargs)
        return self._save(instance=instance)

    def update(self, instance: Model, **kwargs) -> Model:
        for key, value in kwargs.items():
            if not hasattr(instance, key):
                raise ValidationError(f"O campo {key} não faz parte do modelo")
            setattr(instance, key, value)
        return self._save(instance=instance)

    def delete(self, instance: Model) -> None:
        instance.delete()
