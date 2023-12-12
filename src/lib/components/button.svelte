<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
</script>

<button
  {type}
  {...$$restProps}
  on:click
  class="bg-white text-black h-10 px-4 font-semibold rounded-md inline-flex items-center justify-center gap-4 transition-opacity hover:opacity-90"
>
  <slot />
</button>
