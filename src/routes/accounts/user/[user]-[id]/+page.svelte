<script lang="ts">
	import { scale } from 'svelte/transition';
	import { UpdateField } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';
	import { nodeBefore } from '$lib/helpers/whitespacesHelper';
	import type { User, UserResponse } from '$lib/interfaces/user.interface';
	import * as m from "$msgs";	import type { PageData } from './$types';


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

		<h1 class="h1">{m.USER_PROFILE({ userName: currentUserData.full_name ? currentUserData.full_name : currentUserData.username })}
		</h1>

		<div class="card">
			<header class="card-header">{m.USER_ROLE()}</header>
			<section class="p-4">{currentUserData.role.label}</section>
			<footer class="card-footer">{currentUserData.role.description}</footer>
		</div>

	<div class="user" transition:scale|local={{ start: 0.2 }}>
		<div class="text">
			<input
				aria-label="User's full name"
				type="text"
				placeholder="User's full name"
				name="full_name"
				value={currentUserData.full_name}
			/>
			<button class="btn btn-outline-secondary" type="button" aria-label="Save user's full name" on:click={(e) => triggerUpdate(e)}>Update</button>
		</div>
	</div>

	<div class="user" transition:scale|local={{ start: 0.3 }}>
		<div class="text">
			<input
				aria-label="User's username"
				type="text"
				placeholder="User's username"
				name="username"
				value={currentUserData.username}
			/>
			<button class="btn btn-outline-secondary" type="button" aria-label="Save user's username" on:click={(e) => triggerUpdate(e)}>Update</button>
		</div>
	</div>
	<div class="user" transition:scale|local={{ start: 0.4 }}>
		<div class="text">
			<input
				aria-label="User's email"
				placeholder="User's email"
				type="email"
				name="email"
				value={currentUserData.email}
			/>
			<button class="btn btn-outline-secondary" type="button" aria-label="Save user's email" on:click={(e) => triggerUpdate(e)}>Update</button>
		</div>
	</div>
	<div class="user" transition:scale|local={{ start: 0.5 }}>
		<div class="text">
			<input
				aria-label="User's bio"
				placeholder="User's bio"
				type="text"
				name="bio"
				value={currentUserData.bio}
			/>
			<button class="btn btn-outline-secondary" type="button" aria-label="Save user's bio" on:click={(e) => triggerUpdate(e)}>Update</button>
		</div>
	</div>
	<div class="user" transition:scale|local={{ start: 0.6 }}>
		<div class="text">
			<input
				aria-label="User's date of birth"
				type="date"
				name="birth_date"
				placeholder="User's date of birth"
				value={currentUserData.birth_date}
			/>
			<button
				class="btn btn-outline-secondary" type="button"
				aria-label="Save user's date of birth"
				on:click={(e) => triggerUpdate(e)}
				>Update</button>
		</div>
	</div>
	
    <div class="card" style="width: 18rem;">
		<div class="card-header">
			{m.USER_ROLE()}
		  </div>
		<div class="card-body">
		  <h5 class="card-title">{currentUserData.role.label}</h5>
		  <p class="card-text">{currentUserData.role.description}</p>
		</div>
	</div>
{/if}