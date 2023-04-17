defmodule SvelteExample.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      SvelteExampleWeb.Telemetry,
      # Start the Ecto repository
      SvelteExample.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: SvelteExample.PubSub},
      # Start Finch
      {Finch, name: SvelteExample.Finch},
      # Start the Endpoint (http/https)
      SvelteExampleWeb.Endpoint
      # Start a worker by calling: SvelteExample.Worker.start_link(arg)
      # {SvelteExample.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: SvelteExample.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    SvelteExampleWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
