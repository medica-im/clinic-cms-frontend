<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
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
                {#each navGroup.list as navLink}
                <li>
                    <a href="{navLink.href}">
                        <span class="w-6 text-center">
							{#if navLink.icon}
							<Fa icon={navLink.icon} />
							{/if}
						</span>
                        <span>{navLink.label}</span>
                    </a>
                </li>
                {/each}
                {/each}
            </ul>
        </nav>
    </div>
{/each}
