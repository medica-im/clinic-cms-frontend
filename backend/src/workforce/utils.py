import logging
from workforce.models import (
    NetworkNode,
    NetworkEdge,
    NodeSet,
    WorkforceNetworkedgeOrganizations,
    WorkforceNetworkedgeFacilities,
    Label,
)
from facility.models import Organization, Facility
from django.utils.translation import get_language
from facility.utils import get_organization

logger = logging.getLogger(__name__)

def occupation(node: NetworkNode, organization: Organization):
    language = get_language()
    user = NodeSet.objects.get(name="user")
    occupation = NodeSet.objects.get(name="occupation")
    medical_specialty = NodeSet.objects.get(name="medical_specialty")
    facility_ids = list(
        Facility.objects
        .filter(active=True, organization=organization)
        .values_list("id", flat=True)
    )
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
        edges = [e for e in path_qs if (organization in e.organizations.all())]
        for edge in edges:
            public_facing=None
            try:
                edge_org=WorkforceNetworkedgeOrganizations.objects.get(
                    networkedge=edge,
                    organization=organization,
                )
                public_facing=edge_org.public_facing
            except WorkforceNetworkedgeOrganizations.DoesNotExist:
                pass
            facilities = (
                NetworkEdge.facilities.through.objects
                        .filter(
                            networkedge=edge,
                            facility_id__in=facility_ids
                        )
                        .values(
                            "facility__name",
                            "facility__contact__formatted_name"
                        )
            )
            if (edge.parent.node_set == medical_specialty):
                dct["specialty"] = {
                    "name":edge.parent.name,
                    "label":Label.get_label(
                        edge.parent.name,
                        gender,
                        'S',
                        language
                    ),
                    "public_facing":public_facing,
                    "facilities": facilities
                    #edge.facilities.all().values("name", "contact__formatted_name"),
                }
            else:
                dct["public_facing"]=public_facing
                dct["facilities"]=facilities
        occupations.append(dct)
    return occupations

def is_staff(request):
    user = request.user
    if user.is_anonymous == True or not user.is_active:
        return False
    user_node = user.node
    if not user_node:
        return False
    organization = get_organization(request)
    if not organization:
        return False
    user_ns = NodeSet.objects.get(name="user")
    occupation_ns = NodeSet.objects.get(name="occupation")
    medical_specialty_ns = NodeSet.objects.get(name="medical_specialty")
    ancestors_edges = user_node.ancestors_edges()
    for ancestor_edge in ancestors_edges:
        if organization in ancestor_edge.organizations.all():
            return True
    return False