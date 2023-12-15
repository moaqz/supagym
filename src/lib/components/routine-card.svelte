<script lang="ts">
  import type { Routine } from "$lib/schema/routine";
  import ChevronRightIcon from "$lib/icons/chevron-right.svg";

  export let routine: Routine;
</script>

<a
  href="/routines/{routine.id}"
  class="flex justify-between gap-4 p-4 border border-neutral-800 rounded-lg group hover:bg-neutral-800 hover:transition-colors"
>
  <div>
    <h4 class="text-base text-neutral-200">{routine.name}</h4>
    <p class="text-sm text-neutral-400 line-clamp-3">
      {#if routine.goal}
        {routine.goal}
      {:else}
        No goal.
      {/if}
    </p>
  </div>

  <div class="flex items-center">
    <svg class="h-6 w-6">
      <use
        href="{ChevronRightIcon}#chevron-right"
        class="group-hover:translate-x-1 group-hover:transition-transform"
      />
    </svg>
  </div>
</a>
