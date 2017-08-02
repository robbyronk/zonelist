defmodule Zone.Web.SessionController do
  use Zone.Web, :controller
  require Logger
  alias Zone.Session

  def index(conn, %{"id_token" => jwt}) do
    Logger.debug("jwt #{inspect(jwt)}")
    Zone.Repo.insert(%Session{jwt: jwt})
    json conn, %{hello: "there"}
  end
end
