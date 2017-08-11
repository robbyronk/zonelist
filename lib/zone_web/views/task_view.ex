defmodule ZoneWeb.TasksView do
  use ZoneWeb, :view
  alias ZoneWeb.TasksView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TasksView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TasksView, "task.json")}
  end

  def render("task.json", %{tasks: task}) do
    %{id: task.id,
      title: task.title,
      status: task.status}
  end
end
