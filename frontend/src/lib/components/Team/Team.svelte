<script lang="ts">
	import Occupations from '$lib/Organization/Occupations.svelte';
	import LL from '$i18n/i18n-svelte';
</script>

<div class="card">
    <h5 class="card-header">
        {$LL.HOME.TEAM.TITLE()}
    </h5>
    <div class="card-body">
        <p class="card-text">
            {$LL.HOME.TEAM.TEXT()}
        </p>
    </div>
    <Occupations />
    <div class="card-body">
        <a href="/annuaire" class="btn btn-primary" role="button">{$LL.ADDRESSBOOK.TITLE()}</a>
    </div>
</div>