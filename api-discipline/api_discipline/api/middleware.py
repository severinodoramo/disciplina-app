from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from api.exceptions import JsonError


class JsonExceptionMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        error_info = (
            exception
            if isinstance(exception, JsonError)
            else {"status_code": 500, "error": "Server error", "detail": str(exception)}
        )

        response = JsonResponse(
            {"error": error_info["error"], "detail": error_info["detail"]}
        )
        response.status_code = error_info["status_code"]

        return response
