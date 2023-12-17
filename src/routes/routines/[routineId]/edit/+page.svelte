<script lang="ts">
  import type { PageData } from "./$types.js";
  import DeleteRoutineModal from "$lib/components/delete-routine-modal.svelte";
  import RoutineForm from "$lib/components/routine-form.svelte";

  export let data: PageData;
</script>

<div class="mb-8 flex items-center justify-between">
  <div class="space-y-1">
    <h1 class="text-2xl font-semibold tracking-tight">Routine</h1>
    <p class="text-sm text-neutral-300">Update your routine</p>
  </div>

  <DeleteRoutineModal />
</div>

<RoutineForm action="updateRoutine" data={data.form} />
