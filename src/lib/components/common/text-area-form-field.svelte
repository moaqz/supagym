<script lang="ts">
  import type { InputConstraint } from "sveltekit-superforms";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

  export let value: string | null;
  export let label: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;
  export let constraints: InputConstraint | undefined = undefined;
  export let id: string;
</script>

<div class="space-y-1">
  <Label for={id}>{label}</Label>
  <Textarea
    bind:value
    aria-invalid={errors ? "true" : undefined}
    class="max-h-40"
    {...constraints}
    {...$$restProps}
  />

  {#if errors}
    <small class="block text-sm font-semibold text-red-400">
      {errors}
    </small>
  {/if}
</div>
