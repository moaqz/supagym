<script lang="ts">
  import Button from "$lib/components/button.svelte";

  export let data;

  async function logout() {
    const { error } = await data.supabase.auth.signOut();

    if (error) {
      // TODO:
    }
  }
</script>

<h1 class="text-3xl font-bold mb-4">Home Page!</h1>
{#if data.session}
  <Button on:click={logout}>Logout</Button>
{:else}
  <a href="/login" class="underline font-semibold">Login</a>
{/if}
