<script lang="ts">
	import { page } from '$app/stores';
	import { language } from '$lib/store/languageStore';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import LocaleSwitcherCarbon from '$lib/components/LocalSwitcherCarbon/LocaleSwitcher.svelte';
	import LocaleSwitcherHeaderCarbon from '$lib/components/LocalSwitcherCarbon/LocaleSwitcherHeader.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { userData } from '$lib/store/userStore';
	import UserHeaderCarbon from '$lib/components/HeaderCarbon/UserHeaderCarbon.svelte';
	import UserSideNavCarbon from '$lib/components/HeaderCarbon/UserSideNavCarbon.svelte';
	import SocialNetworksCarbon from '$lib/components/HeaderCarbon/SocialNetworksCarbon.svelte';
	import SoMedSideNavCarbon from '$lib/components/HeaderCarbon/SoMedSideNavCarbon.svelte';
	import { variables } from '$lib/utils/constants';
	import {
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
	HeaderAction,
	HeaderUtilities,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
	SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SideNavDivider,
  } from "carbon-components-svelte";
  import Fade from "carbon-icons-svelte/lib/Fade.svelte";
  import Translate from "carbon-icons-svelte/lib/Translate.svelte";

  let isSideNavOpen = false;
  let isOpenLanguage = false;

  export let facility;

	const timeline = variables.TIMELINE;

	function hasSoMed(socialnetworks, somed) {
		return socialnetworks.some((e) => e.type == somed);
	}
	function getUrl(array, type) {
		var element = array.find((e) => e.type == type);
		return element.website;
	}
</script>

<Header company={capitalizeFirstLetter(facility.formatted_name, $language)} bind:isSideNavOpen href="/" >
	<svelte:fragment slot="skip-to-content">
	  <SkipToContent />
	</svelte:fragment>
	<HeaderNav>
	  <HeaderNavItem href="/sites" text="Sites" />
	  <HeaderNavItem href="/contact" text="Contact" />
	  <HeaderNavItem href="/annuaire" text={$LL.NAVBAR.ADDRESSBOOK()} />
	  <HeaderNavItem href="{variables.BLOG_URI}" text="Blog" />
	  <HeaderNavMenu text={$LL.FACILITY.OUTPATIENT_CLINIC()}>
		<HeaderNavItem href="/{ facility.category.slug }" text={$LL.NAVBAR.ABOUT()} />
		<HeaderNavItem href="/chronologie" text={$LL.NAVBAR.TIMELINE()} />
		<HeaderNavItem href="/projet-de-sante" text={$LL.NAVBAR.HEALTH_PROJECT()} />
	  </HeaderNavMenu>
	  <UserHeaderCarbon user={$userData} {facility} />
	  <SocialNetworksCarbon data={facility.contact.socialnetworks} />
	  <HeaderUtilities>
	  <LocaleSwitcherHeaderCarbon />
</HeaderUtilities>
	</HeaderNav>
	
</Header>

<SideNav bind:isOpen={isSideNavOpen} rail=true>
	<SideNavItems>
	  <SideNavLink icon={Fade} href="/sites" text="Sites" />
	  <SideNavLink icon={Fade} href="/contact" text="Contact" />
	  <SideNavLink icon={Fade} href="/annuaire" text={$LL.NAVBAR.ADDRESSBOOK()} />
	  <SideNavLink icon={Fade} href="{variables.BLOG_URI}" text="Blog" />

	  <SideNavMenu icon={Fade} text={$LL.FACILITY.OUTPATIENT_CLINIC()}>
		<SideNavMenuItem href="/{ facility.category.slug }" text={$LL.NAVBAR.ABOUT()} />
		<SideNavMenuItem href="/chronologie" text={$LL.NAVBAR.TIMELINE()} />
		<SideNavMenuItem href="/projet-de-sante" text={$LL.NAVBAR.HEALTH_PROJECT()} />
	  </SideNavMenu>
	  <SideNavDivider />
	  <UserSideNavCarbon user={$userData} {facility} />
	  <SideNavDivider />
	  <SoMedSideNavCarbon data={facility.contact.socialnetworks} />
	  <SideNavDivider />
	  <SideNavLink icon={Translate}>
	  <LocaleSwitcherCarbon />
	  </SideNavLink>
	</SideNavItems>
  </SideNav>