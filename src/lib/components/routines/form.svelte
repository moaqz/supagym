<script lang="ts">
  import { insertRoutineSchema, type InsertRoutine } from "$lib/schema/routine";
  import type { SuperValidated } from "sveltekit-superforms";
  import { superForm } from "sveltekit-superforms/client";
  import { Button } from "$lib/components/ui/button";
  import { toast } from "svelte-sonner";
  import DotSpinner from "$lib/components/common/dot-spinner.svelte";
  import { TextFormField, TextAreaField } from "$lib/components/common";

  export let data: SuperValidated<InsertRoutine>;
  export let action: "createRoutine" | "updateRoutine";

  const { form, enhance, errors, submitting, constraints } = superForm(data, {
    validators: insertRoutineSchema,
    onResult: (event) => {
      if (event.result.type === "success") {
        toast.success("Saved successfully");
      }

      if (event.result.type === "failure") {
        toast.error("Something went wrong", {
          description: "Please try again",
        });
      }
    },
  });
</script>

<form
  use:enhance
  method="POST"
  class="flex flex-col space-y-3"
  action="?/{action}"
>
  <TextFormField
    id="routine-name"
    name="name"
    label="Name"
    bind:value={$form.name}
    errors={$errors.name}
    placeholder="e.g. Cardio Monday"
    constraints={$constraints.name}
  />

  <TextAreaField
    id="routine-goal"
    name="goal"
    label="Goal"
    bind:value={$form.goal}
    errors={$errors.goal}
    placeholder="e.g. Improve cardiovascular health."
    constraints={$constraints.goal}
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
