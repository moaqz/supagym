<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import EmptyState from "$lib/components/empty-state.svelte";
  import RoutineCard from "$lib/components/routine-card.svelte";

  export let data;
</script>

<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="font-semibold tracking-tight text-2xl">Routines</h1>
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
    </ul>
  {:else}
    <EmptyState title="No routines" description="Create your first routine">
      <Button href="/routines/new">Create</Button>
    </EmptyState>
  {/if}
</div>
