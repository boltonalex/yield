<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import ButtonGroup from './ButtonGroup.svelte';

  import { drawChart } from '../utils/chart';

  export let bondData;

  const getFilteredData = (/** @type {string} */ range) => {
    switch (range) {
      case '3M':
        return bondData.bonds_3m;
      case '1Y':
        return bondData.bonds_1y;
      case '3Y':
        return bondData.bonds_3y;
      default:
        return bondData.bonds_current;
    }
  };

  const selectedRange = writable('3M');

  onMount(() => {
    drawChart(getFilteredData('3M'), bondData.bonds_current, $selectedRange);
    selectedRange.subscribe((range) => {
      drawChart(getFilteredData(range), bondData.bonds_current, $selectedRange);
    });
  });

  const buttonOptions = [
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' },
    { label: '3Y', value: '3Y' },
    { label: 'All', value: 'All' },
  ];
</script>

<ButtonGroup options={buttonOptions} bind:selectedValue={$selectedRange} />
<div class="flex flex-col items-start justify-between gap-20">
  <div class="mt-4 flex flex-row gap-3 border-t-1 border-gray-200 pt-4">
    <div id="chart" class="grow"></div>
    <div id="chart-legend" class="w-[200px] border-l-1 border-l-gray-200 pl-4"></div>
  </div>
  <div id="zoombar"></div>
</div>

<style>
  div {
    text-align: center;
  }
</style>
