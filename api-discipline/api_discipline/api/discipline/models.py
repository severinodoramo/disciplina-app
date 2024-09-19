from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager as DjangoBaseUserManager


class BaseUserManager(DjangoBaseUserManager):
    def get_by_natural_key(self, username: str):
        return self.get(username=username)


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True, editable=False)
    username = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = BaseUserManager()
    USERNAME_FIELD = "username"

    class Meta:
        verbose_name = "Usuário"


class Discipline(models.Model):
    name = models.CharField(max_length=30)
    school = models.CharField(max_length=70)
    schedule = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Disciplina"
