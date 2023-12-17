<script lang="ts">
  import type { PageData } from "./$types";
  import ExerciseForm from "$lib/components/exercise-form.svelte";

  export let data: PageData;
</script>

<div class="mb-8 space-y-1">
  <h1 class="text-2xl font-semibold tracking-tight">Exercise</h1>
  <p class="text-sm text-neutral-300">
    {#if data.exercise}
      Update your exercise
    {:else}
      Create your exercise
    {/if}
  </p>
</div>

<ExerciseForm
  action={data.exercise ? "updateExercise" : "createExercise"}
  data={data.form}
/>
