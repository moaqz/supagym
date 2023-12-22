<script lang="ts">
  import { formatDatetime } from "$lib/formatDatetime";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="mb-8">
  <h1 class="text-2xl font-semibold tracking-tight">
    Workout logs: {data.routine.name} routine
  </h1>
  <p>Overview of your progress.</p>
</div>

<section class="pb-8">
  <ul class="grid gap-3">
    {#each data.exerciseLogs as log}
      <li class="flex flex-col justify-between gap-2 rounded-lg border p-4">
        <p class="text-base font-medium">
          {log.exercises?.name}
        </p>

        <div class="flex items-center justify-between">
          <time datetime={log.createdAt}>
            Completed at {formatDatetime(log.createdAt)}
          </time>
        </div>
      </li>
    {/each}
  </ul>
</section>
