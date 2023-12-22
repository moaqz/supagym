<script lang="ts">
  import "../app.css";
  import { goto, invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import { ModeToggler } from "$lib/components/common";
  import { Toaster } from "svelte-sonner";
  import { ModeWatcher } from "mode-watcher";
  import { Github } from "lucide-svelte";

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

<div class="mx-auto min-h-screen max-w-2xl border-x px-4 shadow-md md:px-8">
  <header class="mb-8 flex h-20 items-center justify-between">
    <a href="/" class="text-xl font-bold">Supagym</a>

    <div class="flex items-center space-x-3">
      {#if data.session}
        <div class="flex items-center space-x-3">
          <img
            width="32"
            height="32"
            src={data.session.user.user_metadata.avatar_url}
            alt="Profile picture of {data.session.user.user_metadata
              .user_name ?? data.session.user.user_metadata.name}"
            class="rounded-full"
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
          <Github size={20} />
        </a>
      {/if}
      <ModeToggler />
    </div>
  </header>

  <main>
    <slot />
    <Toaster richColors closeButton />
    <ModeWatcher />
  </main>
</div>
