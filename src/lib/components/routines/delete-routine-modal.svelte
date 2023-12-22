<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import DotSpinner from "$lib/components/common/dot-spinner.svelte";

  let deleting = false;
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "destructive" })}>
    Delete routine
  </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete the routine.
      </Dialog.Description>
    </Dialog.Header>

    <form
      action="?/deleteRoutine"
      method="POST"
      use:enhance={() => {
        deleting = true;

        return async ({ update, result }) => {
          await update();
          deleting = false;

          if (result.type === "failure") {
            toast.error("Something went wrong", {
              description: "Please try again",
            });
          }
        };
      }}
    >
      <Button variant="destructive" type="submit" disabled={deleting}>
        {#if deleting}
          <DotSpinner />
        {:else}
          Delete
        {/if}
      </Button>
    </form>
  </Dialog.Content>
</Dialog.Root>
