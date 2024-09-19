from api.discipline.views import (
    DisciplineListView,
    UserCreateView,
    UserUpdateView,
    UserDeleteView,
    UserGetView,
    UserLoginView,
    UserLogoutView,
    DisciplineCreateView,
    DisciplineUpdateView,
    DisciplineDeleteView,
    DisciplineGetView,
)

from django.urls import path

urlpatterns = [
    # user
    path("user/create/", UserCreateView.as_view()),
    path("user/update/<int:user_id>/", UserUpdateView.as_view()),
    path("user/delete/<int:user_id>/", UserDeleteView.as_view()),
    path("user/get/<int:user_id>/", UserGetView.as_view()),
    path("user/login/", UserLoginView.as_view()),
    path("user/logout/", UserLogoutView.as_view()),
    # Discipline
    path("discipline/create/", DisciplineCreateView.as_view()),
    path("discipline/update/<int:discipline_id>/", DisciplineUpdateView.as_view()),
    path("discipline/delete/<int:discipline_id>/", DisciplineDeleteView.as_view()),
    path("discipline/get/<int:discipline_id>/", DisciplineGetView.as_view()),
    path("discipline/list/", DisciplineListView.as_view()),
]
