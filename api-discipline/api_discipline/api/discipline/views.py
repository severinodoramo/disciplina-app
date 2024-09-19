from django.http import HttpRequest, JsonResponse
from django.views import View
from api.mixins import LoginRequiredMixin
from api.discipline.service import UserService, DisciplineService
from api.discipline.repository import UserRepository, DisciplineRepository
from api.discipline.transport import UserRequestTransport, DisciplineRequestTransport
from django.contrib.auth import authenticate, login, logout
from api.exceptions import JsonInternalServerError, JsonPermissionError
from dataclasses import asdict
import json


class UserCreateView(View):
    service = UserService()

    def post(self, request: HttpRequest) -> JsonResponse:
        data = json.loads(request.body)
        transport = UserRequestTransport(**data)
        user = self.service.create(request=transport)
        return JsonResponse(
            {"message": "Usuário criado com sucesso", "user": asdict(user)}, status=201
        )


class UserUpdateView(LoginRequiredMixin, View):
    login_url = "/auth/login/"
    service = UserService()

    def put(self, request: HttpRequest, user_id: int) -> JsonResponse:
        data = json.loads(request.body)
        transport = UserRequestTransport(**data)

        if request.user.id != user_id:
            raise JsonPermissionError(
                "Você não tem permissão para alterar a senha deste usuário"
            )

        user = self.service.update(request=transport, user_id=user_id)
        return JsonResponse(
            {"message": "Usuário atualizado com sucesso", "user": asdict(user)},
            status=200,
        )


class UserDeleteView(LoginRequiredMixin, View):
    login_url = "/auth/login/"
    service = UserService()

    def delete(self, request: HttpRequest, user_id: int) -> JsonResponse:
        self.service.delete(user_id=user_id)
        return JsonResponse({"message": "Usuário excluído com sucesso"}, status=200)


class UserGetView(LoginRequiredMixin, View):
    login_url = "/auth/login/"
    repository = UserRepository()

    def get(self, request: HttpRequest, user_id: int) -> JsonResponse:
        print(user_id)
        user = self.repository.get_user(user_id=user_id)
        return JsonResponse({"user": asdict(user)}, status=200)


class UserLoginView(View):
    repository = UserRepository()

    def post(self, request: HttpRequest) -> JsonResponse:
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        user = authenticate(request=request, username=username, password=password)

        if not user:
            return JsonResponse({"error": "Username ou senha inválidos"}, status=400)

        login(request=request, user=user)
        session_key = request.session.session_key

        if not session_key:
            raise JsonInternalServerError("Erro do servidor ao realizar login")

        return JsonResponse(
            {
                "message": "Login realizado com sucesso",
                "user": asdict(self.repository.make_transport(user)),
                "session_key": request.session.session_key,
            },
            status=201,
        )


class UserLogoutView(View):
    def post(self, request: HttpRequest) -> JsonResponse:
        logout(request=request)
        return JsonResponse({"message": "Logout realizado com sucesso"}, status=201)


class DisciplineCreateView(LoginRequiredMixin, View):
    login_url = "/auth/login/"
    service = DisciplineService()

    def post(self, request: HttpRequest) -> JsonResponse:
        data = json.loads(request.body)
        transport = DisciplineRequestTransport(**data)
        discipline = self.service.create(request=transport)
        return JsonResponse(
            {
                "message": "Disciplina criada com sucesso",
                "discipline": asdict(discipline),
            },
            status=201,
        )


class DisciplineUpdateView(LoginRequiredMixin, View):
    login_url = "/auth/login/"
    service = DisciplineService()

    def put(self, request: HttpRequest, discipline_id: int) -> JsonResponse:
        data = json.loads(request.body)
        transport = DisciplineRequestTransport(**data)
        discipline = self.service.update(request=transport, discipline_id=discipline_id)
        return JsonResponse(
            {
                "message": "Disciplina atualizada com sucesso",
                "discipline": asdict(discipline),
            },
            status=200,
        )


class DisciplineDeleteView(LoginRequiredMixin, View):
    login_url = "/auth/login/"
    service = DisciplineService()

    def delete(self, request: HttpRequest, discipline_id: int) -> JsonResponse:
        self.service.delete(discipline_id=discipline_id)
        return JsonResponse(
            {
                "message": "Disciplina excluída com sucesso",
            },
            status=200,
        )


class DisciplineGetView(LoginRequiredMixin, View):
    login_url = "/auth/login/"
    repository = DisciplineRepository()

    def get(self, request: HttpRequest, discipline_id: int) -> JsonResponse:
        discipline = self.repository.get_discipline(discipline_id=discipline_id)
        return JsonResponse({"discipline": asdict(discipline)}, status=200)


class DisciplineListView(LoginRequiredMixin, View):
    login_url = "/auth/login/"
    repository = DisciplineRepository()

    def get(self, request: HttpRequest) -> JsonResponse:
        disciplines = self.repository.get_all_disciplines()
        return JsonResponse({"disciplines": [asdict(discipline) for discipline in disciplines]}, status=200)
