<script lang="ts">
  import type { InputConstraint } from "sveltekit-superforms";

  export let value: string | number;
  export let label: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;
  export let constraints: InputConstraint | undefined = undefined;
  export let step = 1;

  function increment() {
    value = (Number(value) || 0) + step;
  }

  function decrement() {
    const newValue = (Number(value) || 0) - step;
    value = newValue >= 0 ? newValue : value;
  }
</script>

<div class="space-y-1">
  <label>
    <span class="mb-1 block text-sm font-medium">{label}</span>
    <div class="flex items-center">
      <button
        type="button"
        on:click={decrement}
        class="h-10 rounded-l-md border border-gray-800 px-4 font-bold"
      >
        -
      </button>
      <input
        type="number"
        min="0"
        class="h-10 w-full border-y border-y-gray-800 bg-transparent px-3 py-2 outline-none"
        aria-invalid={errors ? "true" : undefined}
        bind:value
        {...constraints}
        {...$$restProps}
      />
      <button
        type="button"
        on:click={increment}
        class="h-10 rounded-r-md border border-gray-800 px-4 font-bold"
      >
        +
      </button>
    </div>
  </label>

  {#if errors}
    <small class="block text-sm font-semibold text-red-400">
      {errors}
    </small>
  {/if}
</div>
