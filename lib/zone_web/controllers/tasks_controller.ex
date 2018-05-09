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

  def indent(conn, %{"id" => id, "sessionId" => session_id}) do
    task = conn
           |> Guardian.Plug.current_resource()
           |> List.get_user_task!(id)
    case List.indent_task(task) do
      {:ok, %Task{}} ->
        ZoneWeb.Endpoint.broadcast("users:#{task.user_id}", "task_indent", %{id: task.id, sessionId: session_id})
        send_resp(conn, :no_content, "")
      {:error, reason} ->
        send_resp(conn, 400, "{error: \"#{reason}}\"")
    end
  end

  def unindent(conn, %{"id" => id, "sessionId" => session_id}) do
    task = conn
           |> Guardian.Plug.current_resource()
           |> List.get_user_task!(id)
    case List.unindent_task(task) do
      {:ok, %Task{}} ->
        ZoneWeb.Endpoint.broadcast("users:#{task.user_id}", "task_unindent", %{id: task.id, sessionId: session_id})
        send_resp(conn, :no_content, "")
      {:error, reason} ->
        send_resp(conn, 400, "{error: \"#{reason}}\"")
    end
  end

  def move_before(conn, %{"id" => id, "targetId" => target_id, "sessionId" => session_id}) do
    task = conn
           |> Guardian.Plug.current_resource()
           |> List.get_user_task!(id)
    before_task = conn
           |> Guardian.Plug.current_resource()
           |> List.get_user_task!(target_id)
    case List.move_task_before(task, before_task) do
      {:ok, %Task{}} ->
        ZoneWeb.Endpoint.broadcast(
          "users:#{task.user_id}",
          "move_task_before",
          %{moveId: task.id, targetId: before_task.id, sessionId: session_id}
        )
        send_resp(conn, :no_content, "")
      {:error, reason} ->
        send_resp(conn, 400, "{error: \"#{reason}}\"")
    end
  end

  def move_after(conn, %{"id" => id, "targetId" => target_id, "sessionId" => session_id}) do
    task = conn
           |> Guardian.Plug.current_resource()
           |> List.get_user_task!(id)
    after_task = conn
           |> Guardian.Plug.current_resource()
           |> List.get_user_task!(target_id)
    case List.move_task_after(task, after_task) do
      {:ok, %Task{}} ->
        ZoneWeb.Endpoint.broadcast(
          "users:#{task.user_id}",
          "move_task_after",
          %{moveId: task.id, targetId: after_task.id, sessionId: session_id}
        )
        send_resp(conn, :no_content, "")
      {:error, reason} ->
        send_resp(conn, 400, "{error: \"#{reason}}\"")
    end
  end
end
