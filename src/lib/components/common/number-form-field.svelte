<script lang="ts">
  import type { InputConstraint } from "sveltekit-superforms";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { PlusIcon, MinusIcon } from "lucide-svelte";

  export let value: string | number;
  export let label: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;
  export let constraints: InputConstraint | undefined = undefined;
  export let step = 1;
  export let id: string;

  function increment() {
    value = (Number(value) || 0) + step;
  }

  function decrement() {
    const newValue = (Number(value) || 0) - step;
    value = newValue >= 0 ? newValue : value;
  }
</script>

<div class="space-y-1">
  <Label for={id}>{label}</Label>

  <div class="flex items-center gap-2">
    <Button type="button" on:click={decrement} variant="outline" size="icon">
      <MinusIcon size={20} />
    </Button>

    <Input
      {id}
      type="number"
      min="0"
      aria-invalid={errors ? "true" : undefined}
      bind:value
      {...constraints}
      {...$$restProps}
    />

    <Button type="button" on:click={increment} variant="outline" size="icon">
      <PlusIcon size={20} />
    </Button>
  </div>

  {#if errors}
    <small class="block text-sm font-semibold text-red-400">
      {errors}
    </small>
  {/if}
</div>
