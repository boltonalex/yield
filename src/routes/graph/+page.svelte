<script lang="ts">
  import { onMount } from 'svelte';
  import YieldCurve from '../../lib/components/YieldCurve.svelte';
  import { bondData } from '../../lib/data/bonds.js';
  onMount(async () => {
    const response = await fetch('/api/bonds');
  });
</script>

<div class="prose mx-auto py-3">
  <YieldCurve {bondData} />
</div>
