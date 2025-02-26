<script lang="ts">
  import Button from './Button.svelte';

  export let options: { label: string; value: string; icon?: string | null }[] = [];
  export let disabled: boolean = false;
  export let selectedValue: string;
</script>

<div class="inline-flex overflow-hidden rounded-lg border border-gray-300">
  {#each options as option, index}
    <Button
      label={option.label}
      icon={option.icon || null}
      selected={selectedValue === option.value}
      {disabled}
      first={index === 0}
      last={index === options.length - 1}
      bind:selectedValue
    />
  {/each}
</div>
