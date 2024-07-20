<script lang="ts">
    import { serializeSchema } from '$lib/utils/json-ld.ts'
    import type { Schema } from '$lib/utils/json-ld.ts'
  
    export let schema: Schema
  </script>
  
  <svelte:head>
    {@html serializeSchema(schema)}
  </svelte:head>