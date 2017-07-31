defmodule Zone.Web.SessionController do
  use Zone.Web, :controller
  require Logger

  def index(conn, %{"id_token" => jwt}) do
    Logger.debug("jwt #{inspect(jwt)}")
    json conn, %{hello: "there"}
  end
end
