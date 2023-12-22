<script lang="ts">
  import type { InputConstraint } from "sveltekit-superforms";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  export let value: string;
  export let label: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;
  export let constraints: InputConstraint | undefined = undefined;
  export let id: string;
</script>

<div class="space-y-1">
  <Label for={id}>{label}</Label>
  <Input
    type="text"
    bind:value
    aria-invalid={errors ? "true" : undefined}
    {id}
    {...constraints}
    {...$$restProps}
  />
  {#if errors}
    <small class="block text-sm font-semibold text-red-400">
      {errors}
    </small>
  {/if}
</div>
