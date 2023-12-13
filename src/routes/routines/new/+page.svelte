<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import { newRoutineSchema } from "$lib/schema/routine";
  import { superForm } from "sveltekit-superforms/client";
  import TextInput from "$lib/components/text-input.svelte";
  import type { PageData } from "./$types";
  import TextArea from "$lib/components/text-area.svelte";
  import { goto } from "$app/navigation";

  export let data: PageData;

  const { form, enhance, errors, submitting } = superForm(data.form, {
    validators: newRoutineSchema,
    onResult({ result }) {
      if (result.type === "success") {
        goto("/routines");
        return;
      }
    },
  });
</script>

<div class="space-y-1 mb-8">
  <h1 class="font-semibold tracking-tight text-2xl">Routine</h1>
  <p class="text-neutral-300 text-sm">Create your routine</p>
</div>

<form use:enhance method="POST" class="flex flex-col space-y-3">
  <TextInput
    name="name"
    label="Name"
    bind:value={$form.name}
    errors={$errors.name}
  />

  <TextArea
    name="description"
    label="Description"
    bind:value={$form.description}
    errors={$errors.description}
  />

  <div>
    <Button type="submit" loading={$submitting}>Confirm</Button>
  </div>
</form>
