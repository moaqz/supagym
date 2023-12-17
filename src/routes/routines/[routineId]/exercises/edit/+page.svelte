<script lang="ts">
  import type { PageData } from "./$types";
  import ExerciseForm from "$lib/components/exercise-form.svelte";

  export let data: PageData;
</script>

<div class="space-y-1 mb-8">
  <h1 class="font-semibold tracking-tight text-2xl">Exercise</h1>
  <p class="text-neutral-300 text-sm">
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
