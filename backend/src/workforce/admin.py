import logging
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from facility.models import Organization, Facility
from .models import (
    EdgeSet,
    NodeSet,
    NetworkEdge,
    NetworkNode,
    Label,
    WorkforceNetworkedgeOrganizations,
    WorkforceNetworkedgeFacilities,
)
from modeltranslation.admin import TranslationAdmin
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.utils.translation import get_language
from accounts.models import GrammaticalGender

logger = logging.getLogger(__name__)


def get_edge(node, obj):
    return (
        NetworkEdge.objects
        .ancestors(obj)
        .filter(child_id=obj.id, parent_id=node.id)
        .first()
    )

def display_organizations(edge: NetworkEdge):
    organizations = []
    try:
        nfs = WorkforceNetworkedgeOrganizations.objects.filter(networkedge=edge)
    except:
        return organizations
    for nf in nfs:
        organizations.append(
            f'🤝 {nf.organization.name} {"📢" if nf.public_facing else "🔒"}'
        )
    return organizations

def display_facilities(edge: NetworkEdge):
    facilities = []
    try:
        nfs = WorkforceNetworkedgeFacilities.objects.filter(networkedge=edge)
    except:
        return facilities
    for nf in nfs:
        facilities.append(
            f'🏢 {nf.facility.name} {"📢" if nf.public_facing else "🔒"}'
        )
    return facilities

def get_edge_link(node, obj):
    edge = get_edge(node, obj)
    if not edge:
        return
    return mark_safe(
        '<a href="{link}">&rarr;</a>'.format(
            link = reverse(
                "admin:workforce_networkedge_change",
                args=(edge.pk,)
            )
        )
    )

def get_node_href(node: NetworkNode):
    return reverse(
        "admin:workforce_networknode_change",
        args=(node.pk,)
    )

def display_node_set(node):
    try:
        return node.node_set.name
    except:
        return
    
def node_link(node: NetworkNode):
    txt = node.name
    href = get_node_href(node)
    return f'<a href="{href}">{txt}</a>'

def display_edge(obj):
    parent_node = NetworkNode.objects.get(id=obj.parent_id)
    child_node = NetworkNode.objects.get(id=obj.child_id)
    display = f'{node_link(parent_node)}'
    node_set = display_node_set(parent_node)
    if node_set:
        display += f' ({node_set}) '
    display += ' &rarr; '
    do = display_organizations(obj)
    if do:
        display += f'{do} '
    df = display_facilities(obj)
    if df:
        display += f'{df} '
    if do or df:
        display += '&rarr; '
    display += f'{node_link(child_node)}'
    node_set = display_node_set(child_node)
    if node_set:
        display += f' ({node_set}) '
    return mark_safe(display)

def display_node(node, obj):
    display = f"{get_edge_link(node,obj)} {node.name}"
    node_set = display_node_set(node)
    if node_set:
        display+=f' ({node_set})'
    if obj:
        edge = get_edge(node, obj)
        logger.debug(f'{edge=}')
        organizations = display_organizations(edge)
        if organizations:
            display+=f" [{', '.join(list(organizations))}]"
    return mark_safe(display)

def display_node_qs(qs, obj=None):
    logger.debug(f'{qs=}')
    if not qs:
        return
    if qs.count() == 1:
        return display_node(qs.first(), obj)
    node_lst = ["<ul>"]
    for node in qs:
        logger.debug(f'{node=}')
        node_lst.append(
            f"<li>{display_node(node, obj)}</li>"
        )
    node_lst.append("</ul>")
    return mark_safe(
        format_html("".join(node_lst))
    )


class UserOrganizationFilter(admin.SimpleListFilter):
    title = 'User organization'
    parameter_name = 'user_organization'

    def lookups(self, request, model_admin):
        lookups = list(Organization.objects.values_list('id', 'name'))
        lookups.append((0, _('None')))
        return lookups
        
    def queryset(self, request, queryset):

        if self.value() == None:
            return queryset
        try:
            user=NodeSet.objects.get(name="user")
        except NodeSet.DoesNotExist:
            return queryset
        if self.value() == '0':
            edge_child_ids = (
                NetworkEdge.objects
                .filter(organizations=None)
                .values_list("child_id", flat=True)
            )
        else:
            organization = Organization.objects.get(id=int(self.value()))
            edge_child_ids = (
            NetworkEdge.objects
            .filter(organizations=organization)
            .values_list("child_id", flat=True)
        )
        return queryset.filter(node_set=user, id__in=edge_child_ids)


class EdgeOrganizationFilter(admin.SimpleListFilter):
    title = 'Edge organization'
    parameter_name = 'edge_organization'

    def lookups(self, request, model_admin):
        lookups = list(Organization.objects.values_list('id', 'name'))
        lookups.append((0, _('None')))
        return lookups

    def queryset(self, request, queryset):
        if not self.value():
            return queryset
        if self.value() == '0':
            organization = None
        else:
            organization = Organization.objects.get(id=int(self.value()))
        return queryset.filter(organizations=organization)

class EdgeFacilityFilter(admin.SimpleListFilter):
    title = 'Edge facility'
    parameter_name = 'edge_facility'

    def lookups(self, request, model_admin):
        lookups = list(Facility.objects.values_list('id', 'name'))
        lookups.append((0, _('None')))
        return lookups

    def queryset(self, request, queryset):
        if not self.value():
            return queryset
        if self.value() == '0':
            facility = None
        else:
            facility = Facility.objects.get(id=int(self.value()))
        return queryset.filter(facilities=facility)


class EdgeNodeSetFilter(admin.SimpleListFilter):
    title = 'Node with NodeSet'
    parameter_name = 'node_nodeset'

    def lookups(self, request, model_admin):
        lookups = list(NodeSet.objects.values_list('id', 'name'))
        lookups.append((0, _('None')))
        return lookups
        
    def queryset(self, request, queryset):
        if not self.value():
            return queryset
        if self.value() == '0':
            nodeset = None
        else:
            nodeset = NodeSet.objects.get(id=int(self.value()))
        nodes_ids: list(int) = NetworkNode.objects \
            .filter(node_set=nodeset) \
            .values_list('id', flat=True)
        return queryset.filter(child_id__in=nodes_ids)


@admin.register(EdgeSet)
class EdgeSetAdmin(admin.ModelAdmin):
    pass


@admin.register(NodeSet)
class NodeSetAdmin(admin.ModelAdmin):
    pass


class NetworkEdgeOrganizationInline(admin.TabularInline):
    model = WorkforceNetworkedgeOrganizations
    extra = 1
    fk_name = 'networkedge'


class NetworkEdgeFacilityInline(admin.TabularInline):
    model = WorkforceNetworkedgeFacilities
    extra = 1
    fk_name = 'networkedge'


@admin.register(NetworkEdge)
class NetworkEdgeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'edge_tag',
    )
    list_filter = (
        EdgeOrganizationFilter,
        EdgeFacilityFilter,
        EdgeNodeSetFilter,
    )
    inlines = (
        NetworkEdgeOrganizationInline,
        NetworkEdgeFacilityInline,
    )

    @admin.display(description='Edge')
    def edge_tag(self, obj):
        return display_edge(obj)


@admin.register(NetworkNode)
class NetworkNodeAdmin(TranslationAdmin):
    list_display = (
        'id',
        'name',
        'label_tag',
        'parents_tag',
        'mesh',
        'node_set',
    )
    list_filter = (
        'node_set',
        UserOrganizationFilter,
    )
    autocomplete_fields = ['mesh',]
    fields = (
        'id',
        'name',
        'label_tag',
        'mesh',
        'node_set',
        'parents_tag',
        'ancestors_tag',
        'children_tag',
        'descendants_tag',  
    )
    readonly_fields = (
        'id',
        'label_tag',
        'parents_tag',
        'ancestors_tag',
        'children_tag',
        'descendants_tag',  
    )
    
    def label_tag(self, obj):
        lang=get_language()
        logger.debug(lang)
        try:
            masculine = GrammaticalGender.objects.get(name="masculine")
        except GrammaticalGender.DoesNotExist:
            return
        try:
            label = Label.objects.get(
                node=obj,
                gender=masculine,
                grammatical_number="S",
                language=lang
            )
            return label.label
        except Label.DoesNotExist as e:
            logger.debug(f'{e}')
            return

    label_tag.short_description = "Label"

    def parents_tag(self, obj):
        return display_node_qs(obj.parents.all(), obj=obj)

    parents_tag.short_description = "Parents"
    
    def ancestors_tag(self, obj):
        return display_node_qs(obj.ancestors())

    ancestors_tag.short_description = "Ancestors"

    def children_tag(self, obj):
        return display_node_qs(obj.children.all())

    children_tag.short_description = "Children"
    
    def descendants_tag(self, obj):
        return display_node_qs(obj.descendants())

    descendants_tag.short_description = "Descendants"


@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = (
        'label',
        'language',
        'node',
        'genders_tag',
        'grammatical_number',
    )
    
    list_filter = (
        'language',
        'gender',
        'grammatical_number',
        'node',
    )
    
    def genders_tag(self, obj):
        return [gender.name for gender in obj.gender.all()]

    genders_tag.short_description = _("Genders")