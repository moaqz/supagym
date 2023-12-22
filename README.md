## Stack

- [**SvelteKit**](https://kit.svelte.dev/)
- [**Supabase**](https://supabase.com/)
- [**Shadcn-svelte**](https://www.shadcn-svelte.com/)
- [**Sonner**](https://svelte-sonner.vercel.app/)

## How to run it locally

> [!IMPORTANT]  
> You will need [Docker](https://www.docker.com/) and the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) installed.

1. Clone the repository:

```bash
git clone git@github.com:moaqz/supagym.git
```

2. Install the dependencies:

```bash
pnpm i
```

4. Start the supabase server:

```bash
supabase start
```

5. Create an `.env` file with the following variables provided by the Supabase CLI.

```env
DATABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
PUBLIC_SUPABASE_URL=
```

6. Create an OAuth client using the callback URL as `${YOUR_PUBLIC_SUPABASE_URL}/auth/v1/callback`

```env
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

> [!NOTE]
> You can choose either the GitHub or Google OAuth client (or both if desired). Only one OAuth client is required to run the app.

## Deploy on Vercel

- [https://supaagym.vercel.app/](https://supaagym.vercel.app/).
