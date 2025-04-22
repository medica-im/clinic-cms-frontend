<script lang="ts">
	import { language } from '$lib/store/languageStore.ts';
    import { popup } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { page } from '$app/state';
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
	import { menuNavLinks, menuNavCats } from '$var/variables.ts';

    function getNavGroups(id: string) {
        let cat = menuNavCats.find(obj => {
            return obj.id === id
        })
    const navGroup = Object.values(menuNavLinks).filter(x => cat.list.includes(x.id));
    return navGroup
    }
	// Reactive
	$: classesActive = (href: string) => {
		return page.url.pathname === href ? 'variant-ringed-primary' : '';
	}
</script>

{#each menuNavCats as navCat}
	<!-- trigger -->
	<button class="btn hover:variant-soft-primary" use:popup={{ event: 'click', target: navCat.id }}>
		<span>{navCat.title[$language]}</span>
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
                    {navGroup.title[$language]}
                </li>
				{/if}
                {#each navGroup.list.filter(e=>e.active != false) as { href, label, icon, preload }}
                <li>
                    <a data-sveltekit-preload-data={preload ? preload:"hover"} {href} class="{classesActive(href)}">
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
