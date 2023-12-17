<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import EmptyState from "$lib/components/empty-state.svelte";
  import RoutineCard from "$lib/components/routine-card.svelte";

  export let data;
</script>

<div class="mb-6 flex items-center justify-between">
  <div>
    <h1 class="text-2xl font-semibold tracking-tight">Routines</h1>
    <p class="text-neutral-300">Overview of all your routines.</p>
  </div>

  <Button href="/routines/new">Create</Button>
</div>

<div>
  {#if data.routines && Boolean(data.routines?.length)}
    <ul class="grid gap-3 pb-8">
      {#each data.routines as routine}
        <li>
          <RoutineCard {routine} />
        </li>
      {/each}

      <li
        class="grid w-full place-content-center rounded-lg border border-dashed border-neutral-700 p-8"
      >
        <Button href="/routines/new">Create routine</Button>
      </li>
    </ul>
  {:else}
    <EmptyState title="No routines" description="Create your first routine">
      <Button href="/routines/new">Create</Button>
    </EmptyState>
  {/if}
</div>
