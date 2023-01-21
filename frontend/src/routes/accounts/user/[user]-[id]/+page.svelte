<script lang="ts">
	import { scale } from 'svelte/transition';
	import { UpdateField } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';
	import { nodeBefore } from '$lib/helpers/whitespacesHelper';
	import type { User, UserResponse } from '$lib/interfaces/user.interface';
	import LL from '$i18n/i18n-svelte';
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
<style>
/*.help {cursor: help;}*/
</style>
<!--div class="container d-grid gap-3">
	<div class="row g-3">
		<div class="col-auto">
			<form class="form-floating">
				<input
					type="text"
					class="form-control"
					id="floatingInputValue"
					placeholder="name@example.com"
					value={currentUserData.username}
				/>
				<label for="floatingInputValue">Username</label>
			</form>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
		</div>
	</div>
	<div class="row g-3">
		<div class="col-auto">
			<form class="form-floating">
				<input
					type="text"
					class="form-control"
					id="floatingInputValue"
					placeholder="name@example.com"
					value={currentUserData.full_name}
				/>
				<label for="floatingInputValue">Full name</label>
			</form>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
		</div>
	</div>
	<div class="row g-3 justify-content-start">
		<div class="col-auto">
			<form class="form-floating">
				<input
					type="email"
					class="form-control"
					id="floatingInputValue"
					placeholder="name@example.com"
					value={currentUserData.email}
				/>
				<label for="floatingInputValue">Email</label>
			</form>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
		</div>
	</div>
	<div class="row g-3 justify-content-start">
		<div class="col-auto">
			<div class="form-floating">
				<textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height: 100px">{currentUserData.bio}</textarea>
                <label for="floatingTextarea">Bio</label>
			</div>
		</div>
		<div class="col-auto">
				<button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
		</div>
	</div>
	<div class="row g-3">
		<div class="col-auto">
			<form class="form-floating">
				<input
					type="date"
					name="birth_date"
					class="form-control"
					id="birthDateInputValue"
					placeholder="name@example.com"
					value={currentUserData.birth_date}
				/>
				<label for="floatingInputValue">Date of birth</label>
			</form>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
		</div>
	</div>
</div-->
	
<div class="container d-grid gap-3 my-3">
{#if currentUserData}
	{#if currentUserData.id}
		<h1>{$LL.USER.PROFILE({ userName: currentUserData.full_name ? currentUserData.full_name : currentUserData.username })}
		</h1>
	{/if}

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
			{$LL.USER.ROLE()}
		  </div>
		<div class="card-body">
		  <h5 class="card-title">{currentUserData.role.label}</h5>
		  <p class="card-text">{currentUserData.role.description}</p>
		</div>
	  </div>  
			  <!-- Modal -->
			  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
				  <div class="modal-content">
					<div class="modal-header">
					  <h5 class="modal-title" id="exampleModalLabel">{currentUserData.role.label}</h5>
					  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						{currentUserData.role.description}
					</div>
					<div class="modal-footer">
					  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				  </div>
				</div>
			  </div>
{/if}
</div>