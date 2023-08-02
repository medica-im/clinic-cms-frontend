<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import LL from '$i18n/i18n-svelte';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
	import User from '$components/SkeletonAppBar/User.svelte';
	import {
		faBars,
		faInfo,
		faTimeline,
		faBookMedical,
		faHouse,
		faMapLocationDot,
		faAddressBook,
		faEnvelope,
		faBlog
	} from '@fortawesome/free-solid-svg-icons';
	import SoMed from '$components/SoMed/SoMed.svelte';

	export let data;

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<nav class="list-nav">
	<ul>
		<li>
			<a href="/" class={classesActive('/')}>
				<span><Fa icon={faHouse} size="lg" /></span>
				<span>{$LL.HOME.TITLE()}</span>
			</a>
		</li>
		<li>
			<a href="/sites" class={classesActive('/sites')}>
				<span><Fa icon={faMapLocationDot} size="lg" /></span>
				<span>Sites</span>
			</a>
		</li>
		<li>
			<a href="/annuaire" class={classesActive('/annuaire')}>
				<span><Fa icon={faAddressBook} size="lg" /></span>
				<span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
			</a>
		</li>
		<li>
			<a href="/contact" class={classesActive('/contact')}>
				<span><Fa icon={faEnvelope} size="lg" /></span>
				<span>Contact</span>
			</a>
		</li>
		{#if variables.BLOG_URI}
		<li>
			<a href={variables.BLOG_URI}>
				<span><Fa icon={faBlog} size="lg" /></span>
				<span>Blog</span>
			</a>
		</li>
		{/if}
		<SoMed data={data.contact.socialnetworks} sideBar={true} />
		<User facility={data.facility} sideBar={true} />
	</ul>
</nav>
