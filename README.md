# Frontend test

This test contains a simple SvelteKit site with some hardcoded data for you to
work with. It is a bare-bones installation of SvelteKit with Tailwind 4
installed.

Your task is to complete as many of the below tasks in the checklist as possible
in 8 hours. Please don't exceed this maximum time as we are not looking for 100%
polished solutions but rather want to see what you prioritise given this time
constraint.

Please avoid using too many third-party packages. Using some low level library
is fine but adding too many prebuilt Svelte components from `npm` feels like it
defeats the purpose of the test. Instead, show us your engineering personality &
taste!

### Components

[Figma reference](https://www.figma.com/design/5a0QotFrGIVCyVjt4QbnVj/Tellimer-frontend-test?node-id=2004-57902&t=NU61aaTYiXcfC2KT-11)

- [x] Install Storybook
- [x] Create the Button component and add it to Storybook ![chart](/button.png)
- [x] Create the "maximised" Yield curve chart using your favorite charting
      library or roll your own canvas in its own component ![chart](/chart.png)
- [x] Add the tooltip pop-over ![chart](/tooltip.png)
- [x] Add the zoombar ![chart](/zoombar.png)
- [ ] Try and make the chart act like the maximised responsive component
      ![chart](/responsive.png)

## Developing

```bash
yarn run dev
```

### Storybook

```bash
yarn run storybook
```

### Build

```bash
yarn run build
```

You can preview the production build with `npm run preview`.
