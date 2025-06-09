<script lang="ts">
	import { scale } from 'svelte/transition';
	import { UpdateField } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';
	import { nodeBefore } from '$lib/helpers/whitespacesHelper';
	import type { User, UserResponse } from '$lib/interfaces/user.interface';
	import * as m from '$msgs';
	import type { PageData } from './$types';

	export let data: PageData;

	const url = `${variables.BASE_API_URI}/accounts/user/`;

	let updateResponse: UserResponse; // updated response from the update
	let triggerUpdate = async (e: Event) => {
		const sibling = nodeBefore(<HTMLElement>e.target);
		const [res, err] = await UpdateField(sibling.name, sibling.value, url);
		if (err.length <= 0) {
			updateResponse = res; //assigns the response to the updated response if no errors
		}
	};
	let currentUserData: User;
	$: data,
		(() => {
			currentUserData = data.response;
			if (updateResponse) currentUserData = updateResponse.user; // if updated data is available, update the currentUserData too...
		})();
</script>

{#if currentUserData && currentUserData.id}
	<header id="hero" class="bg-surface-100-800-token hero-gradient">
		<div class="mx-0 flex flex-col items-center justify-center p-4 py-6 space-y-2">
			<h1 class="h1">
				{m.USER_PROFILE({
					userName: currentUserData.full_name ? currentUserData.full_name : currentUserData.username
				})}
			</h1>
		</div>
	</header>

	<section id="team" class="bg-surface-100-800-token team-hero">
		<div class="section-container">
			<div class="card variant-ghost">
				<header class="card-header">
					<h4 class="h4">{m.USER_ROLE()}</h4>
				</header>
				<section class="p-4">
					<h5 class="h5">{currentUserData.role.label}</h5>
					<p>{currentUserData.role.description}</p>
				</section>
			</div>
		</div>
	</section>
	<section id="team" class="bg-surface-100-800-token team-gradient">
		<div class="section-container">
			<div class="grid grid-cols-1 gap-2">
				<div class="user" transition:scale|local={{ start: 0.2 }}>
					<div class="flex p-2 space-x-2">
						<input
							aria-label="User's full name"
							type="text"
							placeholder="User's full name"
							name="full_name"
							value={currentUserData.full_name}
							class="input"
						/>
						<button
							class="btn variant-ghost-primary"
							type="button"
							aria-label="Save user's full name"
							on:click={(e) => triggerUpdate(e)}>Update</button
						>
					</div>
				</div>

				<div class="user" transition:scale|local={{ start: 0.3 }}>
					<div class="flex p-2 space-x-2">
						<input
							aria-label="User's username"
							type="text"
							placeholder="User's username"
							name="username"
							value={currentUserData.username}
							class="input"
						/>
						<button
							class="btn variant-ghost-primary"
							type="button"
							aria-label="Save user's username"
							on:click={(e) => triggerUpdate(e)}>Update</button
						>
					</div>
				</div>
				<div class="user" transition:scale|local={{ start: 0.4 }}>
					<div class="flex p-2 space-x-2">
						<input
							aria-label="User's email"
							placeholder="User's email"
							type="email"
							name="email"
							value={currentUserData.email}
							class="input"
						/>
						<button
							class="btn variant-ghost-primary"
							type="button"
							aria-label="Save user's email"
							on:click={(e) => triggerUpdate(e)}>Update</button
						>
					</div>
				</div>
				<div class="user" transition:scale|local={{ start: 0.5 }}>
					<div class="flex p-2 space-x-2">
						<input
							aria-label="User's bio"
							placeholder="User's bio"
							type="text"
							name="bio"
							value={currentUserData.bio}
							class="input"
						/>
						<button
							class="btn variant-ghost-primary"
							type="button"
							aria-label="Save user's bio"
							on:click={(e) => triggerUpdate(e)}>Update</button
						>
					</div>
				</div>
				<div class="user" transition:scale|local={{ start: 0.6 }}>
					<div class="flex p-2 space-x-2">
						<input
							aria-label="User's date of birth"
							type="date"
							name="birth_date"
							placeholder="User's date of birth"
							value={currentUserData.birth_date}
							class="input"
						/>
						<button
							class="btn variant-ghost-primary"
							type="button"
							aria-label="Save user's date of birth"
							on:click={(e) => triggerUpdate(e)}>Update</button
						>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

<style lang="postcss">
	.section-container {
		@apply mx-auto flex w-full max-w-7xl items-center justify-center p-4 py-8;
	}
	/* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
</style>
