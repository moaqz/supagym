<script lang="ts">
  import { EmptyState } from "$lib/components/common";
  import { Button } from "$lib/components/ui/button";
  import { formatDatetime } from "$lib/formatDatetime";
  import type { PageData } from "./$types";
  import * as Table from "$lib/components/ui/table";
  import { page } from "$app/stores";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { MoreVertical } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import { invalidate } from "$app/navigation";

  export let data: PageData;

  let currentPage: number;
  let canPageBackwards = false;
  let canPageForwards = false;
  let routineId = "";

  $: {
    currentPage = Number($page.url.searchParams.get("page")) || 1;
    if (currentPage < 1) {
      currentPage = 1;
    }

    canPageBackwards = currentPage > 1;
    canPageForwards = currentPage < data.totalPages;
    routineId = $page.params.routineId;
  }

  async function deleteWorkoutLog(exerciseId: number, workoutId: number) {
    const response = await fetch(
      `/api/workouts?exerciseId=${exerciseId}&workoutId=${workoutId}`,
      { method: "DELETE" },
    );

    if (!response.ok) {
      toast.error("Failed to delete workout log", {
        description: "Please try later.",
      });
      return;
    }

    toast.success("Deleted successfully");
    invalidate("supagym:logs");
  }
</script>

<div class="mb-8">
  <h1 class="text-2xl font-semibold tracking-tight">
    Workout logs for {data.routine.name} routine
  </h1>
  <p>Overview of your progress.</p>
</div>

<section class="pb-8">
  {#if Boolean(data.exerciseLogs.length)}
    <div class="space-y-3">
      <Table.Root class="rounded-md border">
        <Table.Header>
          <Table.Row>
            <Table.Head>Exercise name</Table.Head>
            <Table.Head>Completion Date</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each data.exerciseLogs as exerciselog, i (i)}
            <Table.Row>
              <Table.Cell class="font-medium">
                {exerciselog.exercises?.name}
              </Table.Cell>
              <Table.Cell>{formatDatetime(exerciselog.createdAt)}</Table.Cell>
              <Table.Cell>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild let:builder>
                    <Button builders={[builder]} size="icon" variant="ghost">
                      <MoreVertical size={18} />
                    </Button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content>
                    <DropdownMenu.Label>Actions</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      class="text-red-400 hover:!text-red-400"
                      on:click={() =>
                        deleteWorkoutLog(
                          exerciselog.exercises.id,
                          exerciselog.id,
                        )}
                    >
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>

      <div class="flex items-center justify-between gap-2">
        <span class="text-sm font-medium">
          Page {currentPage} of {data.totalPages}
        </span>

        <div>
          {#if canPageBackwards}
            <Button
              size="sm"
              variant="outline"
              href="/routines/{routineId}/logs?page={currentPage - 1}"
            >
              Previous
            </Button>
          {:else}
            <Button size="sm" variant="outline" disabled>Previous</Button>
          {/if}

          {#if canPageForwards}
            <Button
              size="sm"
              variant="outline"
              href="/routines/{routineId}/logs?page={currentPage + 1}"
            >
              Next
            </Button>
          {:else}
            <Button size="sm" variant="outline" disabled>Next</Button>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <EmptyState
      title="No workout logs found"
      description="You did not complete any exercises for this routine."
    >
      <Button href="/routines/{data.routine.id}">Explore Exercises</Button>
    </EmptyState>
  {/if}
</section>
