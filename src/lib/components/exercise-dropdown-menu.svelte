<script lang="ts">
  import MoreHorizontal from "$lib/icons/more-horizontal.svg";
  import type { Exercise } from "$lib/schema/exercise";
  import AddExecution from "./add-execution.svelte";
  import DeleteExerciseModal from "./delete-exercise-modal.svelte";

  export let exercise: Exercise;
  let isDropdownOpen = false;

  function handleDropdownClick() {
    isDropdownOpen = !isDropdownOpen;
  }

  function handleDropdownFocusLoss({
    relatedTarget,
    currentTarget,
  }: FocusEvent) {
    if (
      relatedTarget instanceof HTMLElement &&
      // @ts-ignore
      currentTarget.contains(relatedTarget)
    ) {
      return;
    }

    isDropdownOpen = false;
  }
</script>

<div class="relative" on:focusout={handleDropdownFocusLoss}>
  <button
    class="grid h-8 w-8 place-content-center rounded-md hover:bg-neutral-800 hover:transition-colors"
    on:click={handleDropdownClick}
  >
    <svg class="h-6 w-6">
      <use href="{MoreHorizontal}#more-horizontal" />
    </svg>
  </button>

  <div
    role="menu"
    style:visibility={isDropdownOpen ? "visible" : "hidden"}
    class="absolute right-0 top-9 z-40 rounded-md border border-neutral-800 bg-dark p-1 text-sm font-medium text-white shadow-lg backdrop:bg-dark/80"
  >
    <a href="/routines/{exercise.routine_id}/exercises/edit?id={exercise.id}">
      <div
        role="menuitem"
        class="flex h-8 w-28 items-center justify-center rounded-md hover:bg-neutral-800 hover:transition-colors"
      >
        Edit
      </div>
    </a>

    <AddExecution {exercise} />

    <div
      role="separator"
      aria-orientation="horizontal"
      class="-mx-1 my-1 h-px bg-neutral-800"
    ></div>

    <DeleteExerciseModal exerciseId={exercise.id} />
  </div>
</div>
