<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faAddressBook, faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faBlog } from '@fortawesome/free-solid-svg-icons';
	import logo from '$lib/assets/images/logo_mssante_sigle.png';
	import MssanteLogo from './MssanteLogo.svelte';
	import type { Email } from '$lib/interfaces/email.interface';

	export let data: Email;
</script>

<div class="flex content-start space-x-2 items-center">
	<div class="flex-initial break-words overflow-hidden">
		<div class="btn btn-sm !bg-transparent p-0 align-middle">
			<span class="w-4"><MssanteLogo /></span>
			<span class="hidden 2xl:inline-block">{data.type_display}</span>
		</div>
	</div>
	<a class="unstyled underline underline-offset-4" href="mailto:{data.email}">
		<div class="w-56 md:w-full flex-initial break-words overflow-hidden">{data.email}</div>
	</a>
</div>
