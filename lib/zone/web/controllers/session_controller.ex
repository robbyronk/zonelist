defmodule Zone.Web.SessionController do
  use Zone.Web, :controller
  require Logger
  alias Zone.Session

  def index(conn, %{"id_token" => jwt}) do
    session_id = Ecto.UUID.generate()
    user = Guardian.Plug.current_resource(conn)
    Zone.Repo.insert(%Session{jwt: jwt, session_hash: session_id, auth0_user: user})
    json conn, %{user: user, session: session_id}
  end
end
