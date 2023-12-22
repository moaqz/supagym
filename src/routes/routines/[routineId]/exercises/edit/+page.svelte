<script lang="ts">
  import type { PageData } from "./$types";
  import { ExerciseForm } from "$lib/components/exercises";

  export let data: PageData;
</script>

<div class="mb-8 space-y-1">
  <h1 class="text-2xl font-semibold tracking-tight">Exercise</h1>
  <p class="text-sm">
    {#if data.exercise}
      Update your exercise
    {:else}
      Create your exercise
    {/if}
  </p>
</div>

<ExerciseForm action="updateExercise" data={data.form} />
