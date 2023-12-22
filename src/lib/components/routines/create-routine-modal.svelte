<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import type { InsertRoutine } from "$lib/schema/routine";
  import type { SuperValidated } from "sveltekit-superforms";
  import RoutineForm from "./form.svelte";

  export let routineForm: SuperValidated<InsertRoutine>;
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
    Create
  </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Routine</Dialog.Title>
      <Dialog.Description>Create your routine</Dialog.Description>
    </Dialog.Header>

    <RoutineForm data={routineForm} action="createRoutine" />
  </Dialog.Content>
</Dialog.Root>
