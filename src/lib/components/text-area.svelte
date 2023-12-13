<script lang="ts">
  import type { InputConstraint } from "sveltekit-superforms";

  export let value: string | null;
  export let label: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;
  export let constraints: InputConstraint | undefined = undefined;
</script>

<div class="space-y-1">
  <label>
    <span class="text-sm font-medium block mb-1">{label}</span>
    <textarea
      bind:value
      class="h-20 max-h-40 px-3 py-2 resize-y rounded-md block w-full bg-transparent border border-gray-800 focus:outline-1 focus:outline-offset-2 focus:outline-double focus:outline-gray-600"
      aria-invalid={errors ? "true" : undefined}
      {...constraints}
      {...$$restProps}
    />
  </label>

  {#if errors}
    <small class="block text-red-400 font-semibold text-sm">
      {errors}
    </small>
  {/if}
</div>
