defmodule Zone.Web.Router do
  use Zone.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :verify_if_token do
#    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end


  # Other scopes may use custom stacks.
  scope "/api", Zone.Web do
    pipe_through [:api, :verify_if_token, :ensure_auth]

    post "/session", SessionController, :index

    get "/tasks", TasksController, :index
  end

  scope "/", Zone.Web do
    pipe_through :browser # Use the default browser stack

    get "/auth_callback", PageController, :auth_callback
    get "/*path", PageController, :index
  end
end
