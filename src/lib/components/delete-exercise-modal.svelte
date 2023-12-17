<script lang="ts">
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import Button from "./button.svelte";

  export let exerciseId: number;
  let dialogRef: HTMLDialogElement;
  let deleting = false;
</script>

<button
  class="flex h-8 w-28 items-center justify-center rounded-md text-red-500 hover:bg-neutral-800 hover:transition-colors"
  on:click={() => dialogRef.showModal()}
>
  Delete
</button>

<dialog
  bind:this={dialogRef}
  class="space-y-4 rounded-lg border border-neutral-800 bg-dark p-6 text-white shadow-lg backdrop:bg-dark/80"
>
  <h3 class="text-xl font-semibold tracking-tight">Are you absolutely sure?</h3>
  <p class="text-sm text-neutral-300">
    This action cannot be undone. This will permanently delete the exercise.
  </p>

  <div class="flex items-center gap-4">
    <Button on:click={() => dialogRef.close()}>Cancel</Button>

    <form
      action="?/deleteExercise"
      method="POST"
      use:enhance={() => {
        deleting = true;

        return async ({ update, result }) => {
          await update();
          deleting = false;

          if (result.type === "success") {
            toast.success("Deleted successfully");
          }

          if (result.type === "error") {
            toast.error("Something went wrong!", {
              description: "Please try again",
            });
          }

          dialogRef.close();
        };
      }}
    >
      <input type="hidden" name="exerciseId" value={exerciseId} />
      <Button variant="destructive" type="submit" loading={deleting}>
        Delete
      </Button>
    </form>
  </div>
</dialog>
