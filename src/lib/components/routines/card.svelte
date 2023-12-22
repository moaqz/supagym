<script lang="ts">
  import type { Routine } from "$lib/schema/routine";
  import { ChevronRight } from "lucide-svelte";

  export let routine: Routine;
</script>

<a
  href="/routines/{routine.id}"
  class="group flex justify-between gap-4 rounded-lg border p-4 hover:transition-colors"
>
  <div>
    <h4 class="text-base group-hover:underline">{routine.name}</h4>
    <p class="line-clamp-3 text-sm">
      {#if routine.goal}
        {routine.goal}
      {:else}
        No goal.
      {/if}
    </p>
  </div>

  <div class="flex items-center">
    <ChevronRight
      class="group-hover:translate-x-2 group-hover:transition-transform"
    />
  </div>
</a>
