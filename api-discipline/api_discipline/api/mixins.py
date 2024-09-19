from django.contrib.auth.mixins import LoginRequiredMixin as DjangoLoginRequiredMixin
from django.http import JsonResponse


class LoginRequiredMixin(DjangoLoginRequiredMixin):
    def handle_no_permission(self):
        return JsonResponse(
            {"error": "Você precisa estar logado para acessar esta página."}, status=401
        )
