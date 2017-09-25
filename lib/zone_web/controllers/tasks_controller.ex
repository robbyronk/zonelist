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
    tasks = user
            |> user_tasks
            |> Zone.Repo.all
    Logger.debug("user #{inspect(user)}")
    Logger.debug("tasks #{inspect(tasks)}")
    #    json conn, tasks: tasks
    render(conn, "index.json", tasks: tasks)
  end

  def create(
        conn,
        %{
          "task" => %{
            "afterId" => afterId
          }
        }
      ) do
    user = Guardian.Plug.current_resource(conn)
    with {:ok, %Task{} = task} <- List.create_task(%{}, afterId, user) do
      # todo maybe should send created task and it's parent?
      ZoneWeb.Endpoint.broadcast("users:#{task.user_id}", "task_create", %{})
      conn
      |> put_status(:created)
      |> render("show.json", task: task)
    end
  end

  def update(conn, %{"id" => id, "task" => task_params, "sessionId" => session_id}) do
    task = conn
           |> Guardian.Plug.current_resource()
           |> List.get_user_task!(id)

    with {:ok, %Task{} = task} <- List.update_task(task, task_params) do
      ZoneWeb.Endpoint.broadcast(
        "users:#{task.user_id}",
        "task_update",
        %{title: task.title, id: task.id, children: task.children, status: task.status, sessionId: session_id})
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = conn
           |> Guardian.Plug.current_resource()
           |> List.get_user_task!(id)
    with {:ok, %Task{} = task} <- List.delete_task(task) do
      ZoneWeb.Endpoint.broadcast("users:#{task.user_id}", "task_delete", %{id: task.id})
      send_resp(conn, :no_content, "")
    end
  end
end
