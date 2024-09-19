from api.transports import BaseRequestTransport, BaseResponseTransport
from dataclasses import dataclass


@dataclass(frozen=True)
class UserTransport:
    username: str


@dataclass(frozen=True)
class DisciplineTransport:
    name: str
    school: str
    schedule: str


@dataclass(frozen=True)
class UserRequestTransport(BaseRequestTransport, UserTransport):
    password: str
    confirm_password: str


@dataclass(frozen=True)
class DisciplineRequestTransport(BaseRequestTransport, DisciplineTransport):
    pass


@dataclass(frozen=True)
class UserResponseTransport(BaseResponseTransport, UserTransport):
    pass


@dataclass(frozen=True)
class DisciplineResponseTransport(BaseResponseTransport, DisciplineTransport):
    pass


@dataclass(frozen=True)
class UserLoginTransport(BaseRequestTransport, UserTransport):
    password: str
