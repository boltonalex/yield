<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonGroup from '../lib/components/ButtonGroup.svelte';
  import { IconsEnum } from '../types.js';

  const { Story } = defineMeta({
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    args: {
      options: [
        { label: '3M', value: '3M' },
        { label: '1Y', value: '1Y' },
        { label: '3Y', value: '3Y' },
        { label: 'All', value: 'All' },
        { label: 'Custom', value: 'Custom', icon: IconsEnum.Calendar },
      ],
      selectedValue: '3M',
      disabled: false,
    },
  });
</script>

<Story name="Default" args={{ selectedValue: '3M' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="With Icon" args={{ selectedValue: 'Custom' }} />
