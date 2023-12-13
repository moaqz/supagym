<script lang="ts">
  import Button from "$lib/components/button.svelte";

  export let data;

  async function loginWithGithub() {
    const { error } = await data.supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "/",
      },
    });

    if (error) {
      // TODO:
    }
  }
</script>

<h1 class="font-semibold tracking-tight text-2xl mb-1">Login to Supagym</h1>
<p class="text-neutral-300 text-sm">Sign in to your account</p>

<div class="mt-6 flex flex-col">
  <Button on:click={loginWithGithub}>Continue with Github</Button>
</div>
