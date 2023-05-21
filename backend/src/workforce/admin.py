import logging
from django.contrib import admin
from django.forms import ModelForm, ValidationError
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from facility.models import Organization, Facility
from workforce.models import (
    EdgeSet,
    NodeSet,
    NetworkEdge,
    NetworkNode,
    Label,
    WorkforceNetworkedgeOrganizations,
    WorkforceNetworkedgeFacilities,
    WorkforceSlug,
    RPPS,
    ADELI,
    CarteVitale,
    Convention,
    Conventionnement,
    PaymentMethod,
    Payment,
    ThirdPartyPayer,
    ThirdPartyPayment,
    SpokenLanguage,
)
from modeltranslation.admin import TranslationAdmin
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.utils.translation import get_language
from accounts.models import GrammaticalGender
import langcodes
from langcodes import Language

logger = logging.getLogger(__name__)


class RPPSInline(admin.TabularInline):
    model = RPPS
    extra = 0

class ADELIInline(admin.TabularInline):
    model = ADELI
    extra = 0

class CarteVitaleInline(admin.TabularInline):
    model = CarteVitale
    extra = 0


class ConventionnementInline(admin.TabularInline):
    model = Conventionnement
    extra = 0


class PaymentInline(admin.TabularInline):
    model = Payment
    extra = 0


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
    try:
        txt = f'{node.user.contact.formatted_name} '
    except:
        txt = ""
    txt += node.name
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
        facilities = display_facilities(edge)
        if organizations:
            display+=f" [{', '.join(list(organizations))}]"
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


class UserFacilityFilter(admin.SimpleListFilter):
    title = 'User facility'
    parameter_name = 'user_facility'

    def lookups(self, request, model_admin):
        lookups = list(Facility.objects.values_list('id', 'name'))
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
                .filter(facilities=None)
                .values_list("child_id", flat=True)
            )
        else:
            facility = Facility.objects.get(id=int(self.value()))
            edge_child_ids = (
            NetworkEdge.objects
            .filter(facilities=facility)
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
        'roles_tag',
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

    @admin.display(description='Roles')
    def roles_tag(self, obj):
        tag_array = []
        for org in obj.organizations.all():
            try:
                weo=WorkforceNetworkedgeOrganizations.objects.get(
                    networkedge=obj,
                    organization=org
                )
            except WorkforceNetworkedgeOrganizations.DoesNotExist:
                continue
            roles = weo.roles.all()
            if roles:
                roles_str = ", ".join([role.name for role in roles])
                tag_array.append(f'{org.name}: {roles_str}' )
        return tag_array or None


class ThirdPartyPaymentInline(admin.TabularInline):
    model = ThirdPartyPayment
    extra = 3
    fk_name = 'node'


class SpokenLanguageModelAdminForm(ModelForm):
    class Meta:
        model = SpokenLanguage
        fields = '__all__'

    def clean_tags(self):
        tags = self.cleaned_data['tags']
        if 'test' in tags:
            raise ValidationError('invalid tag: test')
        for tag in tags:
            try:
                Language.get(tag)
            except:
                try:
                    langcodes.find(tag)
                except:
                    raise ValidationError(
                        f'{tag} is invalid language code or language name'
                    )
        return tags


class SpokenLanguageInline(admin.TabularInline):
    model = SpokenLanguage
    form = SpokenLanguageModelAdminForm
    fields = (
        'node',
        'tags',
        'language_name_tag',
    )
    readonly_fields = (
        'language_name_tag',
    )
    
    def language_name_tag(self, obj):
        try:
            return ", ".join(obj.display_name())
        except:
            return
    
    language_name_tag.short_description=_("Natural language name")


@admin.register(NetworkNode)
class NetworkNodeAdmin(TranslationAdmin):
    list_display = (
        'id',
        'name',
        'formatted_name_tag',
        'label_tag',
        'parents_tag',
        'mesh',
        'node_set',
        'rpps',
    )
    search_fields = ['name', 'user__contact__formatted_name']
    list_filter = (
        'node_set',
        UserOrganizationFilter,
        UserFacilityFilter,
    )
    autocomplete_fields = ['mesh',]
    fields = (
        'id',
        'formatted_name_tag',
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
        'formatted_name_tag',
        'label_tag',
        'parents_tag',
        'ancestors_tag',
        'children_tag',
        'descendants_tag',  
    )
    inlines=[
        RPPSInline,
        ADELIInline,
        CarteVitaleInline,
        ConventionnementInline,
        PaymentInline,
        ThirdPartyPaymentInline,
        SpokenLanguageInline
    ]

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
    
    def formatted_name_tag(self, obj):
        return obj.user.contact.formatted_name

    formatted_name_tag.short_description = "Contact"


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
    autocomplete_fields = ['node',]
    
    def genders_tag(self, obj):
        return [gender.name for gender in obj.gender.all()]

    genders_tag.short_description = _("Genders")


@admin.register(RPPS)
class RPPSAdmin(admin.ModelAdmin):
    autocomplete_fields = ['node',]

@admin.register(ADELI)
class ADELIAdmin(admin.ModelAdmin):
    autocomplete_fields = ['node',]

@admin.register(CarteVitale)
class CarteVitaleAdmin(admin.ModelAdmin):
    autocomplete_fields = ['node', 'organization']


@admin.register(WorkforceSlug)
class WorkforceSlugAdmin(TranslationAdmin):
    list_display = (
        'slug',
        'node',
    )
    
    autocomplete_fields = ['node',]


@admin.register(Convention)
class ConventionAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'label',
        'profession_tag',
    )
    
    autocomplete_fields = ['profession',]
    
    def profession_tag(self, obj):
        return [profession.name for profession in obj.profession.all()]
    
    profession_tag.short_description = _("Profession")
    
    
@admin.register(Conventionnement)
class ConventionnementAdmin(admin.ModelAdmin):
    list_display = (
        'convention',
        'node',
        'organization',
    )
    
    autocomplete_fields = ['node',]


@admin.register(PaymentMethod)
class PaymentMethodAdmin(TranslationAdmin):
    list_display = (
        'name',
        'label',
    )


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        'node',
        'method_tag',
        'organization',
    )
    
    def method_tag(self, obj):
        return [method.label for method in obj.method.all()]
    
    method_tag.short_description = _("Payment method")


@admin.register(ThirdPartyPayer)
class ThirdPartyPayerAdmin(TranslationAdmin):
    list_display = (
        'name',
        'label',
    )


@admin.register(SpokenLanguage)
class SpokenLanguageAdmin(admin.ModelAdmin):
    form=SpokenLanguageModelAdminForm
    list_display = (
        'node',
        'tags',
        'language_name_tag',
    )
    
    def language_name_tag(self, obj):
        try:
            return ", ".join(obj.display_name())
        except:
            return
    
    language_name_tag.short_description=_("Natural language name")