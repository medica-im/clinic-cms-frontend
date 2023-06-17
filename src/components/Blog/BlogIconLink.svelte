<script lang="ts">
    import { variables } from '$lib/utils/constants';
	import Fa from 'svelte-fa';
	import { faBlog } from '@fortawesome/free-solid-svg-icons';
</script>

<a href={variables.BLOG_URI} title={'blog'} class="btn-icon btn-icon-sm hover:variant-soft-secondary" rel="external">
    <span><Fa icon={faBlog} size="lg" /></span>
</a>