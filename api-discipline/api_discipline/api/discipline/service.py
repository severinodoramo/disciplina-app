from api.services import BaseService
from api.discipline.models import User, Discipline
from api.discipline.repository import UserRepository, DisciplineRepository
from api.exceptions import JsonValidationError
from dataclasses import asdict
from api.discipline.transport import *


class UserService(BaseService):
    model = User
    repository = UserRepository()

    def _check_passwords_equals(self, password: str, confirm_password: str) -> None:
        if password != confirm_password:
            raise JsonValidationError("As senhas devem ser iguais")

    def create(self, request: UserRequestTransport) -> UserResponseTransport:
        self._check_passwords_equals(request.password, request.confirm_password)
        user = self.model(username=request.username)
        user.set_password(request.password)
        return self.repository.make_transport(super()._save(user))

    def update(
        self, request: UserRequestTransport, user_id: int
    ) -> UserResponseTransport:
        self._check_passwords_equals(request.password, request.confirm_password)
        user = self.repository.get_by_id(id=user_id)
        user.set_password(request.password)
        user.username = request.username
        return self.repository.make_transport(super()._save(user))

    def delete(self, user_id: int) -> None:
        user = self.repository.get_by_id(id=user_id)
        super().delete(instance=user)


class DisciplineService(BaseService):
    model = Discipline
    repository = DisciplineRepository()

    def create(
        self, request: DisciplineRequestTransport
    ) -> DisciplineResponseTransport:
        return self.repository.make_transport(super().create(**asdict(request)))

    def update(
        self, request: DisciplineRequestTransport, discipline_id: int
    ) -> DisciplineResponseTransport:
        discipline = self.repository.get_by_id(id=discipline_id)
        return self.repository.make_transport(
            super().update(instance=discipline, **asdict(request))
        )

    def delete(self, discipline_id: int) -> None:
        discipline = self.repository.get_by_id(id=discipline_id)
        super().delete(instance=discipline)
