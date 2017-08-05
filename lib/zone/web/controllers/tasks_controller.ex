defmodule Zone.Web.TasksController do
  use Zone.Web, :controller
  require Logger

  def index(conn, %{}) do
#    user = Guardian.Plug.current_resource(conn)
    json conn, [
      %{id: "root", title: "Project", children: ["1"]},
      %{id: "1", title: "Something", children: []},
    ]
  end
end
