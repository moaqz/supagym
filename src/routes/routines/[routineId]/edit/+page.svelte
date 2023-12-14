<script lang="ts">
  import TextArea from "$lib/components/text-area.svelte";
  import TextInput from "$lib/components/text-input.svelte";
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types.js";
  import Button from "$lib/components/button.svelte";
  import { newRoutineSchema } from "$lib/schema/routine.js";
  import DeleteRoutineModal from "$lib/components/delete-routine-modal.svelte";

  export let data: PageData;

  const { form, enhance, errors, submitting } = superForm(data.form, {
    validators: newRoutineSchema,
  });
</script>

<div class="space-y-1 mb-8">
  <h1 class="font-semibold tracking-tight text-2xl">Routine</h1>
  <p class="text-neutral-300 text-sm">Update your routine</p>
</div>

<form
  use:enhance
  method="POST"
  action="?/updateRoutine"
  class="flex flex-col space-y-3"
>
  <TextInput
    name="name"
    label="Name"
    bind:value={$form.name}
    errors={$errors.name}
  />

  <TextArea
    name="goal"
    label="Goal"
    bind:value={$form.goal}
    errors={$errors.goal}
  />

  <div class="flex items-center gap-x-4">
    <DeleteRoutineModal />
    <Button type="submit" loading={$submitting}>Confirm</Button>
  </div>
</form>
