from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class BaseResponseTransport:
    id: int
    created_at: datetime
    updated_at: datetime


@dataclass(frozen=True)
class BaseRequestTransport:
    pass
