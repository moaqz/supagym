<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import Footer from "$lib/components/footer.svelte";
  import type { Provider } from "@supabase/supabase-js";
  import { toast } from "svelte-sonner";

  export let data;

  let submitting = false;
  let selectedProvider: Provider;

  async function login(provider: Provider) {
    submitting = true;
    selectedProvider = provider;

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
<p class="text-sm text-neutral-300">Sign in to your account</p>

<div class="mt-6 flex flex-col gap-3">
  <Button
    on:click={() => login("github")}
    loading={submitting && selectedProvider === "github"}
    disabled={submitting}
  >
    <img src="/github-mark.svg" alt="Github Logo" class="h-5 w-5" />
    Continue with Github
  </Button>

  <Button
    on:click={() => login("google")}
    loading={submitting && selectedProvider === "google"}
    disabled={submitting}
  >
    <img src="/google-logo.svg" alt="Google Logo" class="h-5 w-5" />
    Continue with Google
  </Button>
</div>

<Footer />
