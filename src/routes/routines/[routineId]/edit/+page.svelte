<script lang="ts">
  import type { PageData } from "./$types.js";
  import { DeleteRoutineModal, RoutineForm } from "$lib/components/routines";

  export let data: PageData;
</script>

<div class="mb-8 flex items-center justify-between">
  <div class="space-y-1">
    <h1 class="text-2xl font-semibold tracking-tight">Routine</h1>
    <p class="text-sm">Update your routine</p>
  </div>

  <DeleteRoutineModal />
</div>

<RoutineForm action="updateRoutine" data={data.form} />
