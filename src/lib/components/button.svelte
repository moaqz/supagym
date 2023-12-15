<script lang="ts">
  import DotSpinner from "./dot-spinner.svelte";

  export let type: "button" | "submit" | "reset" = "button";
  export let loading = false;
  export let variant: "primary" | "destructive" = "primary";
  export let href: string | undefined = undefined;

  let buttonClass: string;

  $: buttonClass = `${
    variant === "primary" ? "bg-white text-black" : "bg-red-800 text-white"
  } enabled:hover:opacity-90 transition-opacity h-10 px-4 font-semibold rounded-md inline-flex items-center justify-center gap-x-3 ${
    loading ? "opacity-60 px-8" : ""
  }`;
</script>

{#if href}
  <a
    {href}
    {...$$restProps}
    on:click
    on:change
    on:keydown
    on:keyup
    on:touchstart|passive
    on:touchend
    on:touchcancel
    on:mouseenter
    on:mouseleave
    class={buttonClass}
  >
    <slot />
  </a>
{:else}
  <button
    on:click
    on:change
    on:keydown
    on:keyup
    on:touchstart|passive
    on:touchend
    on:touchcancel
    on:mouseenter
    on:mouseleave
    {type}
    {...$$restProps}
    disabled={loading || $$restProps.disabled}
    class={buttonClass}
  >
    {#if loading}
      <DotSpinner />
    {:else}
      <slot />
    {/if}
  </button>
{/if}
