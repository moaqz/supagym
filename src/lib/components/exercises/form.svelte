<script lang="ts">
  import {
    createExerciseSchema,
    updateExerciseSchema,
    type CreateExercise,
    type UpdateExercise,
  } from "$lib/schema/exercise";
  import { superForm } from "sveltekit-superforms/client";
  import type { SuperValidated } from "sveltekit-superforms";
  import { Button } from "$lib/components/ui/button";
  import { toast } from "svelte-sonner";
  import DotSpinner from "$lib/components/common/dot-spinner.svelte";
  import { TextFormField, NumberFormField } from "$lib/components/common";

  export let data: SuperValidated<UpdateExercise | CreateExercise>;
  export let action: "createExercise" | "updateExercise";
  export let onSuccess: () => void = () => {};

  const { form, enhance, errors, submitting } = superForm(data, {
    validators:
      action === "createExercise" ? createExerciseSchema : updateExerciseSchema,
    onResult(event) {
      if (event.result.type === "failure") {
        toast.error("Something went wrong!", {
          description: "Please try again",
        });
      }

      if (
        event.result.type === "redirect" &&
        event.result.location.startsWith("/routines")
      ) {
        toast.success("Saved successfully");
        onSuccess();
      }
    },
  });
</script>

<form action="?/{action}" method="POST" class="flex flex-col gap-3" use:enhance>
  {#if action === "updateExercise"}
    <input type="hidden" name="id" bind:value={$form.id} />
  {/if}

  <TextFormField
    id="exercise-name"
    label="Name"
    name="name"
    placeholder="Bench press"
    bind:value={$form.name}
    errors={$errors.name}
  />

  <NumberFormField
    id="exercise-sets"
    label="Sets"
    name="sets"
    bind:value={$form.sets}
    errors={$errors.sets}
  />

  <NumberFormField
    id="exercise-reps"
    label="Repetitions"
    name="reps"
    bind:value={$form.reps}
    errors={$errors.reps}
  />

  <div>
    <Button type="submit" disabled={$submitting}>
      {#if $submitting}
        <DotSpinner />
      {:else}
        Confirm
      {/if}
    </Button>
  </div>
</form>
