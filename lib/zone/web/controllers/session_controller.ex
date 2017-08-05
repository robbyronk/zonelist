defmodule Zone.Web.SessionController do
  use Zone.Web, :controller
  require Logger
  alias Zone.Session
  alias Zone.User

  def index(conn, %{"id_token" => jwt}) do
    session_id = Ecto.UUID.generate()
    auth0_user = Guardian.Plug.current_resource(conn)
    Zone.Repo.insert(%Session{jwt: jwt, session_hash: session_id, auth0_user: auth0_user})
    user = User.find_or_create(%User{auth0_user: auth0_user})
    json conn, %{user: auth0_user, session: session_id}
  end
end
