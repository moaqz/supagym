<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Footer } from "$lib/components/common";
  import type { Provider } from "@supabase/supabase-js";
  import { toast } from "svelte-sonner";
  import { Github } from "lucide-svelte";

  export let data;

  let submitting = false;

  async function login(provider: Provider) {
    submitting = true;

    const { error } = await data.supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: "/routines",
      },
    });

    if (error) {
      toast.error("Unable to log in. Please try again later.");
    }

    submitting = false;
  }
</script>

<h1 class="mb-1 text-2xl font-semibold tracking-tight">Login to Supagym</h1>
<p class="text-sm">Sign in to your account</p>

<div class="mt-6 flex flex-col gap-3">
  <Button on:click={() => login("github")} disabled={submitting}>
    <Github class="mr-3" />
    Continue with Github
  </Button>

  <Button on:click={() => login("google")} disabled={submitting}>
    <img src="/google-logo.svg" alt="Google Logo" class="mr-3 h-5 w-5" />
    Continue with Google
  </Button>
</div>

<Footer />
