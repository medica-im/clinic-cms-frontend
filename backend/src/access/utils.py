import logging
from django.contrib.auth import get_user_model
from access.models import Role
from workforce.utils import is_staff
from django.http import HttpRequest
from access.models import AccessControl, Endpoint, Role
User=get_user_model()

logger = logging.getLogger(__name__)

roles = dict()
for role in ["superuser", "administrator", "staff", "registered", "anonymous"]:
    roles[role], _ = Role.objects.get_or_create(name=role)

def get_role(user: User, request: HttpRequest):
    logger.debug(f'{user=}')
    if user.is_anonymous:
        return roles["anonymous"]
    elif user.is_superuser:
        return roles["superuser"]
    elif is_staff(user, request):
        return roles["staff"]
    elif user.is_authenticated:
        return roles["registered"]

def authorize(endpoint: str, role: Role, permissions: int):
    try:
        endpoint = Endpoint.objects.get(name=endpoint)
    except Endpoint.DoesNotExist:
        return False
    try:
        ac = AccessControl.objects.get(endpoint=endpoint, role=role)
    except AccessControl.DoesNotExist:
        return False
    logger.debug(f'{ac.check_permission(permissions)=}')
    return ac.check_permission(permissions)
    