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

<h1 class="text-3xl font-bold mb-4">Login Page</h1>
<Button on:click={loginWithGithub}>Login with Github</Button>
