<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="w-full rounded-lg border border-dashed p-8">
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="flex flex-col items-center justify-center gap-1">
      <h3 class=" text-lg font-medium">{title}</h3>
      <p class="text-center">{description}</p>
    </div>
    <div>
      <slot />
    </div>
  </div>
</div>
