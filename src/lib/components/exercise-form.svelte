<script lang="ts">
  import {
    createExerciseSchema,
    updateExerciseSchema,
    type CreateExercise,
    type UpdateExercise,
  } from "$lib/schema/exercise";
  import { superForm } from "sveltekit-superforms/client";
  import NumberInput from "./number-input.svelte";
  import TextInput from "./text-input.svelte";
  import type { SuperValidated } from "sveltekit-superforms";
  import Button from "./button.svelte";
  import { toast } from "svelte-sonner";

  export let data: SuperValidated<UpdateExercise | CreateExercise>;
  export let action: "createExercise" | "updateExercise";

  const { form, enhance, errors, submitting } = superForm(data, {
    validators:
      action === "createExercise" ? createExerciseSchema : updateExerciseSchema,
    onResult(event) {
      if (event.result.type === "redirect") {
        toast.success("Saved successfully");
      }

      if (event.result.type === "failure") {
        toast.error("Something went wrong!", {
          description: "Please try again",
        });
      }
    },
  });
</script>

<form action="?/{action}" method="POST" class="flex flex-col gap-3" use:enhance>
  {#if action === "updateExercise"}
    <input type="hidden" name="id" bind:value={$form.id} />
  {/if}

  <TextInput
    label="Name"
    name="name"
    bind:value={$form.name}
    errors={$errors.name}
  />

  <NumberInput
    label="Sets"
    name="sets"
    bind:value={$form.sets}
    errors={$errors.sets}
  />

  <NumberInput
    label="Repetitions"
    name="reps"
    bind:value={$form.reps}
    errors={$errors.reps}
  />

  <div>
    <Button type="submit" loading={$submitting}>Confirm</Button>
  </div>
</form>
