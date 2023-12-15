<script lang="ts">
  import type { PageData } from "./$types";
  import RoutineForm from "$lib/components/routine-form.svelte";

  export let data: PageData;
</script>

<div class="space-y-1 mb-8">
  <h1 class="font-semibold tracking-tight text-2xl">Routine</h1>
  <p class="text-neutral-300 text-sm">Create your routine</p>
</div>

<RoutineForm action="createRoutine" data={data.form} />
