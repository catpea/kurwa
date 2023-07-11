<script>

  const stack = [
    {name:`$src/routes/[user]/kurwa/+page.svelte`, description:``},
    {name:`$lib/kurwa/system/ui/Application.svelte`, description:``},
    {name:`$lib/kurwa/system/ui/View.svelte`, description:``},
    {name:`$lib/kurwa/system/ui/Node.svelte`, description:``},
    {name:`$lib/kurwa/system/controls/Button.svelte`, description:``},
  ];

</script>

<ol>
  {#each stack as item}
    <li>{item.name}</li>
  {/each}
</ol>
