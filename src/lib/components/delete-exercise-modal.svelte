<script lang="ts">
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import Button from "./button.svelte";

  export let exerciseId: number;
  let dialogRef: HTMLDialogElement;
  let deleting = false;
</script>

<button
  class="w-24 h-8 flex items-center justify-center hover:bg-neutral-800 hover:transition-colors rounded-md text-red-500"
  on:click={() => dialogRef.showModal()}
>
  Delete
</button>

<dialog
  bind:this={dialogRef}
  class="bg-dark text-white border border-neutral-800 shadow-lg rounded-lg backdrop:bg-dark/80 p-6 space-y-4"
>
  <h3 class="font-semibold tracking-tight text-xl">Are you absolutely sure?</h3>
  <p class="text-neutral-300 text-sm">
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
