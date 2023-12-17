<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "./button.svelte";
  import { toast } from "svelte-sonner";
  import { goto } from "$app/navigation";

  let dialogRef: HTMLDialogElement | null;
  let deleting = false;

  function openModal() {
    dialogRef?.showModal();
  }

  function closeModal() {
    dialogRef?.close();
  }
</script>

<Button variant="destructive" on:click={openModal}>Delete routine</Button>
<dialog
  bind:this={dialogRef}
  class="space-y-4 rounded-lg border border-neutral-800 bg-dark p-6 text-white shadow-lg backdrop:bg-dark/80"
>
  <h3 class="text-xl font-semibold tracking-tight">Are you absolutely sure?</h3>
  <p class="text-sm text-neutral-300">
    This action cannot be undone. This will permanently delete the routine.
  </p>

  <div class="flex items-center gap-4">
    <Button on:click={closeModal}>Cancel</Button>

    <form
      action="?/deleteRoutine"
      method="POST"
      use:enhance={() => {
        deleting = true;

        return async ({ update, result }) => {
          await update();
          deleting = false;

          if (result.type === "success") {
            toast.success("Deleted successfully");
          }

          if (result.type === "failure") {
            toast.error("Something went wrong", {
              description: "Please try again",
            });
          }

          closeModal();

          goto("/routines");
        };
      }}
    >
      <Button variant="destructive" type="submit" loading={deleting}>
        Delete
      </Button>
    </form>
  </div>
</dialog>
