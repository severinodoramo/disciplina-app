from api.repositories import BaseRepository
from api.discipline.transport import UserResponseTransport, DisciplineResponseTransport
from api.discipline.models import User, Discipline


class UserRepository(BaseRepository):
    model = User

    def make_transport(self, instance: User) -> UserResponseTransport:
        return UserResponseTransport(
            id=instance.id,
            username=instance.username,
            created_at=instance.created_at,
            updated_at=instance.updated_at,
        )

    def get_user(self, user_id: int) -> UserResponseTransport:
        return self.make_transport(super().get_by_id(id=user_id))


class DisciplineRepository(BaseRepository):
    model = Discipline

    def make_transport(self, instance: Discipline) -> DisciplineResponseTransport:
        return DisciplineResponseTransport(
            id=instance.id,
            name=instance.name,
            school=instance.school,
            schedule=instance.schedule,
            created_at=instance.created_at,
            updated_at=instance.updated_at,
        )

    def get_discipline(self, discipline_id: int) -> DisciplineResponseTransport:
        return self.make_transport(super().get_by_id(id=discipline_id))
    
    def get_all_disciplines(self) -> list[DisciplineResponseTransport]:
        return [self.make_transport(discipline) for discipline in super().get_all()]
