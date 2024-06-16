<script lang="ts">
import Fa from 'svelte-fa';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { handlePostRequestsWithPermissions } from '$lib/utils/requestUtils';
import { variables } from '$lib/utils/constants';
import { invalidate, invalidateAll } from '$app/navigation';
import { userData } from '$lib/store/userStore';
import { isObjectEmpty } from '$lib/utils/utils';
    
export let data;

let showDropdown: boolean = false;
let selectValue: string|null = data.moderation=="UN" ? null : data.moderation;

function dateTimeToFrench(dt: string) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var date  = new Date(dt);
        return date.toLocaleDateString("fr-FR", options);
}
const applyChange = async()=>{
        const responseUrl = `${variables.BASE_API_URI}/surveys/${data.surveyName}/responses/${data.id}/`;
        console.log(`responseUrl: ${responseUrl}`);
        const body = {moderation: selectValue};
        const [res, err] = await handlePostRequestsWithPermissions(fetch, responseUrl, body, 'PATCH');
        console.log(res, err);
        showDropdown=!showDropdown;
        selectValue=null;
        invalidateAll();
}
</script>

<div class="card variant-ghost">
	<header class="card-header">
                <div class="flex space-x-2 items-center">
                        <div>Contribution nº{data.id}.</div>
                        {#if !isObjectEmpty($userData)}
                <div>Statut: {data.get_moderation_display}.</div>
                {#if !showDropdown}
                        <button type="button" class="btn btn-sm variant-ghost" on:click={()=>showDropdown=!showDropdown}><span><Fa icon={faPenToSquare}/></span><span>{#if data.moderation=="UN"}Modérer{:else}Modifier{/if}</span></button>
                {/if}
                {/if}
                        {#if showDropdown}
<select class="select w-32" bind:value={selectValue}>
	<option value="PU">Publique</option>
	<option value="PR">Privée</option>
	<option value="SP">Spam</option>
</select>
<button type="button" class="btn btn-sm variant-ghost" on:click={()=>applyChange()}><span>OK</span></button>
<button type="button" class="btn btn-sm variant-ghost" on:click={()=>{showDropdown=!showDropdown; selectValue=null;}}><span>Annuler</span></button>
                        {/if}
                
                </div>
        </header>
	<section class="p-4">{data.content}</section>
	<footer class="card-footer text-right">{dateTimeToFrench(data.created)}</footer>
</div>