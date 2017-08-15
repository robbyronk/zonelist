defmodule ZoneWeb.TasksController do
  use ZoneWeb, :controller
  require Logger
  import Ecto
  alias Zone.List
  alias Zone.List.Task

  action_fallback ZoneWeb.FallbackController

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

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = List.get_task!(id)

    with {:ok, %Task{} = task} <- List.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, _) do
    # delete thing, return it
    json conn, %{}
  end
end
