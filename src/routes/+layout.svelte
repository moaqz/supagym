<script lang="ts">
  import "../app.css";
  import { goto, invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import Button from "$lib/components/button.svelte";

  export let data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });

  async function logout() {
    const { error } = await data.supabase.auth.signOut();
    if (!error) {
      goto("/");
    }
  }
</script>

<div
  class="max-w-2xl mx-auto min-h-screen shadow-md px-4 md:px-8 text-white bg-dark border-x border-x-neutral-800"
>
  <header class="h-16 flex items-center justify-between mb-8">
    <a href="/" class="text-xl font-bold">Supagym</a>

    <div class="flex items-center space-x-3">
      {#if data.session}
        <div class="flex items-center space-x-3">
          <img
            width="32"
            height="32"
            src={data.session.user.user_metadata.avatar_url}
            alt="Profile picture of {data.session.user.user_metadata.user_name}"
          />

          <span class="font-medium hidden sm:block">
            {data.session.user.user_metadata.user_name}
          </span>
        </div>

        <span>|</span>

        <Button on:click={logout}>Sign out</Button>
      {:else}
        <a href="/login" class="hover:underline font-semibold"> Login </a>

        <a
          href="https://github.com/moaqz/supagym"
          target="_blank"
          class="hover:underline font-semibold"
        >
          Github
        </a>
      {/if}
    </div>
  </header>

  <main>
    <slot />
  </main>
</div>
