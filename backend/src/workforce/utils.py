import logging
from workforce.models import (
    NetworkNode,
    NetworkEdge,
    NodeSet,
    WorkforceNetworkedgeFacilities,
    Label,
)
from facility.models import Facility
from django.utils.translation import get_language
from facility.utils import get_facility

logger = logging.getLogger(__name__)

def occupation(node: NetworkNode, facility: Facility):
    language = get_language()
    user = NodeSet.objects.get(name="user")
    occupation = NodeSet.objects.get(name="occupation")
    medical_specialty = NodeSet.objects.get(name="medical_specialty")
    if not node.node_set == user:
        return
    django_user = node.user
    try:
        gender = django_user.grammatical_gender.name
    except:
        gender='masculine'
    occupations = []
    occupation_nodes = node.ancestors().filter(node_set=occupation)
    for occupation_node in occupation_nodes:
        dct = {
            "name": occupation_node.name,
            "label": Label.get_label(
                occupation_node.name,
                gender,
                'S',
                language=language
            )
        }
        path_qs=NetworkEdge.objects.path(
            start_node=occupation_node,
            end_node=node
        )
        edges = [e for e in path_qs if (facility in e.facilities.all())]
        for edge in edges:
            public_facing=None
            try:
                edge_facility=WorkforceNetworkedgeFacilities.objects.get(
                    networkedge=edge,
                    facility=facility,
                )
                public_facing=edge_facility.public_facing
            except WorkforceNetworkedgeFacilities.DoesNotExist:
                pass
            if (edge.parent.node_set == medical_specialty):
                dct["specialty"] = {
                    "name":edge.parent.name,
                    "label":Label.get_label(
                        edge.parent.name,
                        gender,
                        'S',
                        language
                    ),
                    "public_facing":public_facing    
                }
            else:
                dct["public_facing"]=public_facing
        occupations.append(dct)
    return occupations

def is_staff(user, request):
    if user.is_anonymous == True or not user.is_active:
        return False
    user_node = user.node
    if not user_node:
        return False
    facility = get_facility(request)
    if not facility:
        return False
    user_ns = NodeSet.objects.get(name="user")
    occupation_ns = NodeSet.objects.get(name="occupation")
    medical_specialty_ns = NodeSet.objects.get(name="medical_specialty")
    ancestors_edges = user_node.ancestors_edges()
    for ancestor_edge in ancestors_edges:
        if facility in ancestor_edge.facilities.all():
            return True
    return False