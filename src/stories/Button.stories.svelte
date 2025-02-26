<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from '../lib/components/Button.svelte';
  import { IconsEnum } from '../types.js';

  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    args: {
      label: 'Default Label',
      selected: false,
      disabled: false,
    },
  });
</script>

<Story name="Default" args={{ label: '3M' }} />
<Story name="Selected" args={{ selected: true }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Icon" args={{ icon: IconsEnum.Home }} />
