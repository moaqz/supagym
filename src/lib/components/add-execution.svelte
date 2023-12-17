<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Exercise } from "$lib/schema/exercise";
  import { toast } from "svelte-sonner";

  export let exercise: Exercise;
</script>

<form
  method="POST"
  action="?/addExecution"
  use:enhance={() => {
    return async ({ update, result }) => {
      await update();

      if (result.type === "success") {
        toast.success("Exercise completion logged successfully!");
      }

      if (result.type === "failure") {
        toast.error("Failed to log exercise completion", {
          description: "Please try again later.",
        });
      }
    };
  }}
>
  <input type="hidden" name="routineId" value={exercise.routine_id} />
  <input type="hidden" name="exerciseId" value={exercise.id} />

  <button
    type="submit"
    class="flex h-8 w-28 items-center justify-center rounded-md hover:bg-neutral-800 hover:transition-colors"
  >
    Log exercise
  </button>
</form>
