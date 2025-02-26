<script lang="ts">
  export let label: string = '';
  export let selected: boolean = false;
  export let disabled: boolean = false;
  export let icon: string | null = null;
  export let first: boolean = false;
  export let last: boolean = false;
  export let selectedValue: string | null = null;
  function onclick() {
    selectedValue = label;
  }
</script>

<button
  class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all
  {first && 'rounded-s-lg'}
  {last && 'rounded-tr-lg rounded-br-lg'}
  {selected ? 'bg-white text-gray-700' : 'border-gray-300 bg-gray-100 text-black'}
  {disabled
    ? 'cursor-not-allowed bg-gray-100 text-gray-700'
    : 'cursor-pointer hover:bg-gray-200 focus:inset-ring-2 focus:inset-ring-gray-900'}"
  {disabled}
  aria-label={`${label}_button`}
  {onclick}
>
  {#if icon}
    <span class={`icon-[${icon}]`}></span>
  {/if}
  {label}
</button>
