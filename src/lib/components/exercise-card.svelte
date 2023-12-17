<script lang="ts">
  import type { Exercise } from "$lib/schema/exercise";
  import ExerciseDropdownMenu from "./exercise-dropdown-menu.svelte";

  export let exercise: Exercise;
</script>

<div
  class="flex flex-col justify-between gap-2 p-4 border border-neutral-800 rounded-lg"
>
  <div class="flex items-center justify-between">
    <p class="text-base font-medium text-neutral-200">{exercise.name}</p>
    <ExerciseDropdownMenu routineId={exercise.routine_id} id={exercise.id} />
  </div>

  <ul class="flex items-center space-x-2 text-neutral-400 text-sm">
    <li class="flex items-center gap-0.5">
      {exercise.reps} Repetitions
    </li>

    <span>&#x2022;</span>

    <li class="flex items-center gap-0.5">
      {exercise.sets} Sets
    </li>
  </ul>
</div>
