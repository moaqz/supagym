<script lang="ts">
  import type { InputConstraint } from "sveltekit-superforms";

  export let value: string;
  export let label: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;
  export let constraints: InputConstraint | undefined = undefined;
</script>

<div class="space-y-1">
  <label>
    <span class="mb-1 block text-sm font-medium">{label}</span>
    <input
      type="text"
      class="block h-10 w-full rounded-md border border-gray-800 bg-transparent px-3 py-2 focus:outline-double focus:outline-1 focus:outline-offset-2 focus:outline-gray-600"
      bind:value
      aria-invalid={errors ? "true" : undefined}
      {...constraints}
      {...$$restProps}
    />
  </label>

  {#if errors}
    <small class="block text-sm font-semibold text-red-400">
      {errors}
    </small>
  {/if}
</div>
