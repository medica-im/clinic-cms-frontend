<script lang="ts">
	import { storeCurrentUrl } from '$lib/store/skeletonStores';
    import { popup } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import {
		faBars,
		faCaretDown,
		faInfo,
		faTimeline,
		faBookMedical,
		faHouse,
		faMapLocationDot,
		faAddressBook,
		faEnvelope,
		faBlog,
		faRightToBracket,
		faRightFromBracket,
		faUserPlus,
		faUser,
		faPersonChalkboard
	} from '@fortawesome/free-solid-svg-icons';
	import { menuNavLinks, menuNavCats } from '../../links';

    function getNavGroups(id: Number) {
        let cat = menuNavCats.find(obj => {
            return obj.id === id
        })
    const navGroup = menuNavLinks.filter((x: Array<any>) => cat.list.includes(x.id));
    return navGroup
    }
	// Reactive
	$: classesActive = (href: string) => {
		return $page.url.pathname === href ? 'variant-ringed-primary' : '';
	}
</script>

{#each menuNavCats as navCat}
	<!-- trigger -->
	<button class="btn hover:variant-soft-primary" use:popup={{ event: 'click', target: navCat.id }}>
		<span>{navCat.title}</span>
		<span class="opacity-50"><Fa icon={faCaretDown} /></span>
	</button>
	<!-- popup -->
	<!-- prettier-ignore -->
	<div class="card p-4 w-fit shadow-xl" data-popup="{navCat.id}">
        <nav class="list-nav">
            <ul>
                {#each getNavGroups(navCat.id) as navGroup}
				{#if getNavGroups(navCat.id).length > 1}
                <li>
                    {navGroup.title}
                </li>
				{/if}
                {#each navGroup.list as { href, label, icon }}
                <li>
                    <a {href} class="{classesActive(href)}">
                        <span class="w-6 text-center">
							{#if icon}
							<Fa icon={icon} />
							{/if}
						</span>
                        <span>{label}</span>
                    </a>
                </li>
                {/each}
                {/each}
            </ul>
        </nav>
    </div>
{/each}
