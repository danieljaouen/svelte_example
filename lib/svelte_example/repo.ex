defmodule SvelteExample.Repo do
  use Ecto.Repo,
    otp_app: :svelte_example,
    adapter: Ecto.Adapters.Postgres
end
