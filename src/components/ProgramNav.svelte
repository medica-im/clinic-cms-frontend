<script lang="ts">
	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter, lowercaseFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { getProgram, getIsOther } from '../links.ts';
	import type { LocalizedString } from 'typesafe-i18n';
	export let data;

	const program = getProgram(data);
	const isOther = getIsOther(data);

	function preposition(name: string) {
		const vowels = ['a', 'e', 'i', 'o', 'u'];
		const firstLetter = name[0].toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
		if (vowels.includes(firstLetter)) {
			return "d'"
		} else {
			return "de "
		}
	}

	function programOf(program: LocalizedString, language: string, isOther: boolean, count: number) {
		program = lowercaseFirstLetter(program[language]);
        if (language == 'fr') {
            if (count==1) {
				return `Notre ${isOther ? 'autre' : '' } programme ${preposition(program)}${program}`
			} else {
				return `Nos ${isOther ? 'autres' : '' } programmes ${preposition(program)}${program}`
			}

		} else if (language == 'en') {
            return `Our ${isOther ? "other " : ""}${program} program${count>1 ? "s" : ""}`
		}
	}
</script>
{#if getProgram(data).list.length > 0}
{@const program = getProgram(data)}
<div class="card bg-initial w-fit my-2 py-2">
	<header class="card-header">
		<h3 class="h3">
			{programOf(program.title, $language, isOther, program.list.length)}
		</h3>
	</header>
	<section class="p-4 space-y-4">
		<nav class="list-nav">
			<ul class="space-y-4">
				{#each program.list as prog}
					<li class="py-1">
						<a href={prog.href} class="btn variant-ghost-surface p-2">
							{#if prog.icon}
								<span class="badge bg-primary-500">{prog.icon}</span>
							{/if}
							<span class="flex-auto">{prog.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</section>
</div>
{/if}