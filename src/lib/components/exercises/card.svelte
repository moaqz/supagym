<script lang="ts">
  import type { Exercise } from "$lib/schema/exercise";
  import DropdownMenu from "./dropdown-menu.svelte";

  export let exercise: Exercise;
</script>

<div class="flex flex-col justify-between gap-2 rounded-lg border p-4">
  <div class="flex items-center justify-between">
    <p class="text-base font-medium">{exercise.name}</p>
    <DropdownMenu {exercise} />
  </div>

  <ul class="flex items-center space-x-2 text-sm">
    <li class="flex items-center gap-0.5">
      {exercise.reps} Repetitions
    </li>

    <span>&#x2022;</span>

    <li class="flex items-center gap-0.5">
      {exercise.sets} Sets
    </li>
  </ul>
</div>
