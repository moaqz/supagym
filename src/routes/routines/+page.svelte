<script lang="ts">
  import EmptyState from "$lib/components/common/empty-state.svelte";
  import { CreateRoutineModal, RoutineCard } from "$lib/components/routines";

  export let data;
</script>

<div class="mb-6 flex items-center justify-between">
  <div>
    <h1 class="text-2xl font-semibold tracking-tight">Routines</h1>
    <p>Overview of all your routines.</p>
  </div>

  <CreateRoutineModal routineForm={data.routineForm} />
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
        class="grid w-full place-content-center rounded-lg border border-dashed p-8"
      >
        <CreateRoutineModal routineForm={data.routineForm} />
      </li>
    </ul>
  {:else}
    <EmptyState title="No routines" description="Create your first routine">
      <CreateRoutineModal routineForm={data.routineForm} />
    </EmptyState>
  {/if}
</div>
