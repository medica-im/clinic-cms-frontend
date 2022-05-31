import logging
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from facility.models import Facility
from .models import (
    EdgeSet,
    NodeSet,
    NetworkEdge,
    NetworkNode,
    Label,
    WorkforceNetworkedgeFacilities,
)
from modeltranslation.admin import TranslationAdmin
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.utils.translation import get_language
from accounts.models import GrammaticalGender

logger = logging.getLogger(__name__)

def get_facilities(node, obj):
    edge = (
        NetworkEdge.objects
        .ancestors(obj)
        .filter(child_id=obj.id, parent_id=node.id)
        .first()
    )
    facilities = []
    try:
        nfs = WorkforceNetworkedgeFacilities.objects.filter(networkedge=edge)
    except:
        return facilities
    for nf in nfs:
        facilities.append(
            f'{nf.facility.name} {"📢" if nf.public_facing else "🔒"}'
        )
    return facilities

def get_edge(node, obj):
    edge = (
        NetworkEdge.objects
        .ancestors(obj)
        .filter(child_id=obj.id, parent_id=node.id)
        .first()
    )
    return mark_safe(
        '<a href="{link}">&rarr;</a>'.format(
            link = reverse(
                "admin:workforce_networkedge_change",
                args=(edge.pk,)
            )
        )
    )

def display_node_set(node):
    try:
        return node.node_set.name
    except:
        return

def display_node(node, obj):
    display = f"{get_edge(node,obj)} {node.name}"
    node_set = display_node_set(node)
    if node_set:
        display+=f' ({node_set})'
    if obj:
        facilities = get_facilities(node, obj)
        logger.debug(f'{facilities=}')
        if facilities:
            display+=f" [{', '.join(list(facilities))}]"
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


class UserFacilityFilter(admin.SimpleListFilter):
    title = 'User facility'
    parameter_name = 'user_facility'

    def lookups(self, request, model_admin):
        return list(Facility.objects.values_list('id', 'name'))

    def queryset(self, request, queryset):
        if not self.value():
            return queryset
        try:
            user=NodeSet.objects.get(name="user")
        except NodeSet.DoesNotExist:
            return queryset
        facility = Facility.objects.get(id=int(self.value()))
        edge_child_ids = (
            NetworkEdge.objects
            .filter(facilities=facility)
            .values_list("child_id", flat=True)
        )
        return queryset.filter(node_set=user, id__in=edge_child_ids)


@admin.register(EdgeSet)
class EdgeSetAdmin(admin.ModelAdmin):
    pass


@admin.register(NodeSet)
class NodeSetAdmin(admin.ModelAdmin):
    pass


class NetworkEdgeFacilityInline(admin.TabularInline):
    model = WorkforceNetworkedgeFacilities
    extra = 1
    fk_name = 'networkedge'


@admin.register(NetworkEdge)
class NetworkEdgeAdmin(admin.ModelAdmin):
    inlines = (NetworkEdgeFacilityInline,)


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
        UserFacilityFilter,
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