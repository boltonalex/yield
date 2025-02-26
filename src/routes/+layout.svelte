<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col">
  <header class="flex h-12 items-center bg-blue-50">
    <div class="container mx-auto flex">
      <img src="/favicon.png" alt="Logo" class="h-6 w-6" />
      <div class="ml-1">
        <a
          class="h-full px-2 text-gray-600 underline-offset-[3px] hover:text-gray-800 hover:underline"
          href="/">Home</a
        >
        <a
          class="h-full px-2 text-gray-600 underline-offset-[3px] hover:text-gray-800 hover:underline"
          href="/graph">Graph</a
        >
      </div>
    </div>
  </header>

  <main class="flex w-full flex-grow">
    {@render children()}
  </main>

  <footer
    class="sticky bottom-0 flex min-h-[3rem] w-full items-center justify-center bg-blue-100 font-mono"
  >
    &copy; {new Date().getFullYear()}
  </footer>
</div>
