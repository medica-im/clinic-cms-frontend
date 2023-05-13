<script lang="ts">
    import { serializeSchema } from '$lib/utils/json-ld'
    import type { Schema } from '$lib/utils/json-ld'
  
    export let schema: Schema
  </script>
  
  <svelte:head>
    {@html serializeSchema(schema)}
  </svelte:head>