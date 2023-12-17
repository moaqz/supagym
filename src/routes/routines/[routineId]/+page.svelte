<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import EmptyState from "$lib/components/empty-state.svelte";
  import ExerciseCard from "$lib/components/exercise-card.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div
  class="mb-6 flex flex-col gap-4 pb-2 md:flex-row md:items-center md:justify-between"
>
  <div>
    <h1 class="text-2xl font-semibold tracking-tight">{data.routine?.name}</h1>

    {#if data.routine?.goal}
      <p class="pretty text-neutral-300">{data.routine.goal}</p>
    {/if}
  </div>

  <div class="flex shrink-0 gap-3">
    <Button href="/routines/{data.routine.id}/history">History</Button>
    <Button href="/routines/{data.routine.id}/edit">Edit routine</Button>
  </div>
</div>

{#if Boolean(data.exercises?.length)}
  <div class="grid gap-2 pb-12">
    {#each data.exercises as exercise}
      <ExerciseCard {exercise} />
    {/each}

    <div
      class="grid w-full place-content-center rounded-lg border border-dashed border-neutral-700 p-8"
    >
      <Button href="/routines/{data.routine.id}/exercises/edit">
        Create exercise
      </Button>
    </div>
  </div>
{:else}
  <EmptyState title="No exercises" description="Create your first exercise">
    <Button href="/routines/{data.routine.id}/exercises/edit">Create</Button>
  </EmptyState>
{/if}
