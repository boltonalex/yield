<script lang="ts">
  import { onMount } from 'svelte';
  import { html } from '../../README.md';

  onMount(async () => {
    const response = await fetch('/api/bonds');
    console.log(await response.json());
  });
</script>

<div class="prose mx-auto py-3">
  {@html html}
</div>
