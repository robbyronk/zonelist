defmodule ZoneWeb.TasksController do
  use ZoneWeb, :controller
  require Logger
  import Ecto

  defp user_tasks(user) do
    assoc(user, :tasks)
  end

  def index(conn, %{}) do
    user = Guardian.Plug.current_resource(conn)
    tasks = user |> user_tasks |> Zone.Repo.all
    Logger.debug("user #{inspect(user)}")
    Logger.debug("tasks #{inspect(tasks)}")
#    json conn, tasks: tasks
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, _) do
    # todo write new task to database, return it
    json conn, %{}
  end

  def update(conn, _) do
    # todo write update to database
    json conn, %{}
  end

  def delete(conn, _) do
    # delete thing, return it
    json conn, %{}
  end
end
