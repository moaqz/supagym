<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div
  class="col-span-full w-full rounded-lg border border-neutral-700 border-dashed p-8"
>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="flex flex-col items-center justify-center gap-1">
      <h3 class=" text-lg font-medium">{title}</h3>
      <p class="text-neutral-300 text-center">{description}</p>
    </div>
    <div>
      <slot />
    </div>
  </div>
</div>
