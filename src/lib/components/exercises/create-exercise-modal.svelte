<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import type { SuperValidated } from "sveltekit-superforms";
  import ExerciseForm from "./form.svelte";
  import type { CreateExercise } from "$lib/schema/exercise";

  export let form: SuperValidated<CreateExercise>;
  let dialogOpen = false;

  function closeDialog() {
    dialogOpen = false;
  }
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
    Create exercise
  </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Exercise</Dialog.Title>
      <Dialog.Description>Create your exercise</Dialog.Description>
    </Dialog.Header>

    <ExerciseForm data={form} action="createExercise" onSuccess={closeDialog} />
  </Dialog.Content>
</Dialog.Root>
