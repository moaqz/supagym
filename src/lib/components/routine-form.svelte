<script lang="ts">
  import { insertRoutineSchema, type InsertRoutine } from "$lib/schema/routine";
  import type { SuperValidated } from "sveltekit-superforms";
  import { superForm } from "sveltekit-superforms/client";
  import TextArea from "./text-area.svelte";
  import TextInput from "./text-input.svelte";
  import Button from "./button.svelte";
  import { toast } from "svelte-sonner";

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
  <TextInput
    name="name"
    label="Name"
    bind:value={$form.name}
    errors={$errors.name}
    placeholder="e.g. Cardio Monday"
    constraints={$constraints.name}
  />

  <TextArea
    name="goal"
    label="Goal"
    bind:value={$form.goal}
    errors={$errors.goal}
    placeholder="e.g. Improve cardiovascular health."
    constraints={$constraints.goal}
  />

  <div>
    <Button type="submit" loading={$submitting}>Confirm</Button>
  </div>
</form>
