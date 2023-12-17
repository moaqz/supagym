<script lang="ts">
  import "../app.css";
  import { goto, invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import Button from "$lib/components/button.svelte";
  import { Toaster } from "svelte-sonner";

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

<svelte:head>
  <title>Supagym</title>
  <meta
    name="description"
    content="Plan, log, and manage your workout sessions. Keep a detailed record of your exercises to stay motivated and achieve your fitness goals."
  />
</svelte:head>

<div
  class="mx-auto min-h-screen max-w-2xl border-x border-x-neutral-800 bg-dark px-4 text-white shadow-md md:px-8"
>
  <header class="mb-8 flex h-20 items-center justify-between">
    <a href="/" class="text-xl font-bold">Supagym</a>

    <div class="flex items-center space-x-3">
      {#if data.session}
        <div class="flex items-center space-x-3">
          <img
            width="32"
            height="32"
            src={data.session.user.user_metadata.avatar_url}
            class="rounded-full"
            alt="Profile picture of {data.session.user.user_metadata
              .user_name ?? data.session.user.user_metadata.name}"
          />

          <span class="hidden font-medium sm:block">
            {data.session.user.user_metadata.user_name ??
              data.session.user.user_metadata.name}
          </span>
        </div>

        <span>|</span>

        <Button on:click={logout}>Sign out</Button>
      {:else}
        <a href="/" class="font-semibold hover:underline"> Home </a>
        <a href="/login" class="font-semibold hover:underline"> Login </a>
        <span>|</span>
        <a href="https://github.com/moaqz/supagym" target="_blank">
          <img src="/github-mark-white.svg" alt="Github Logo" class="h-5 w-5" />
        </a>
      {/if}
    </div>
  </header>

  <main>
    <slot />
    <Toaster richColors closeButton />
  </main>
</div>
