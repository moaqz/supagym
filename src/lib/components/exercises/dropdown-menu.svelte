<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Dialog from "$lib/components/ui/dialog";
  import type { Exercise } from "$lib/schema/exercise";
  import { MoreHorizontal } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { invalidate } from "$app/navigation";
  import { toast } from "svelte-sonner";

  export let exercise: Exercise;

  async function recordExercise() {
    const response = await fetch("/api/exercises", {
      method: "POST",
      body: JSON.stringify({
        routineId: exercise.routine_id,
        exerciseId: exercise.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Failed to log exercise completion", {
        description:
          "There was an issue logging your exercise completion. Please try again later.",
      });
      return;
    }

    toast.success("Exercise completion logged successfully!");
    invalidate("supagym:exercises");
  }

  async function deleteExercise() {
    const response = await fetch(
      `/api/exercises?routineId=${exercise.routine_id}&exerciseId=${exercise.id}`,
      { method: "DELETE" },
    );

    if (!response.ok) {
      toast.error("Failed to delete exercise", {
        description:
          "There was an issue deleting the exercise. Please try again.",
      });
      return;
    }

    toast.success("Deleted successfully");
    invalidate("supagym:exercises");
  }
</script>

<Dialog.Root>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button size="icon" variant="ghost" builders={[builder]}>
        <MoreHorizontal />
      </Button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content align="end">
      <DropdownMenu.Group>
        <DropdownMenu.Item on:click={recordExercise}>
          Record exercise
        </DropdownMenu.Item>
        <DropdownMenu.Item
          href="/routines/{exercise.routine_id}/exercises/edit?id={exercise.id}"
        >
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Separator />

        <Dialog.Trigger class="w-full">
          <DropdownMenu.Item class="text-red-400 hover:!text-red-400">
            Delete
          </DropdownMenu.Item>
        </Dialog.Trigger>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>

  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Are you absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete the exercise.
      </Dialog.Description>
    </Dialog.Header>

    <Dialog.Footer>
      <Button variant="destructive" on:click={deleteExercise}>Delete</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
