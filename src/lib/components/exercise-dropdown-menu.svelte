<script lang="ts">
  import MoreHorizontal from "$lib/icons/more-horizontal.svg";
  import DeleteExerciseModal from "./delete-exercise-modal.svelte";

  export let id: number;
  export let routineId: number;
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
    class="h-8 w-8 grid place-content-center rounded-md hover:transition-colors hover:bg-neutral-800"
    on:click={handleDropdownClick}
  >
    <svg class="h-6 w-6">
      <use href="{MoreHorizontal}#more-horizontal" />
    </svg>
  </button>

  <div
    role="menu"
    style:visibility={isDropdownOpen ? "visible" : "hidden"}
    class="z-40 absolute right-0 top-9 p-1 bg-dark text-white text-sm font-medium border border-neutral-800 shadow-lg rounded-md backdrop:bg-dark/80"
  >
    <a href="/routines/{routineId}/exercises/edit?id={id}">
      <div
        role="menuitem"
        class="w-24 h-8 flex items-center justify-center hover:bg-neutral-800 rounded-md hover:transition-colors"
      >
        Edit
      </div>
    </a>

    <div
      role="separator"
      aria-orientation="horizontal"
      class="bg-neutral-800 -mx-1 my-1 h-px"
    ></div>

    <DeleteExerciseModal exerciseId={id} />
  </div>
</div>
