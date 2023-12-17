<script lang="ts">
  import type { PageData } from "./$types";
  import RoutineForm from "$lib/components/routine-form.svelte";

  export let data: PageData;
</script>

<div class="mb-8 space-y-1">
  <h1 class="text-2xl font-semibold tracking-tight">Routine</h1>
  <p class="text-sm text-neutral-300">Create your routine</p>
</div>

<RoutineForm action="createRoutine" data={data.form} />
