defmodule Zone.List do
  @moduledoc """
  The List context. Contains Tasks and Task related functions.
  """
  require Logger
  import Ecto.Query
  import Ecto
  alias Zone.List.Task
  alias Zone.Repo

  defp user_tasks(user) do
    assoc(user, :tasks)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task!(id), do: Repo.get!(Task, id)

  def get_user_task!(user, id), do: Repo.get!(user_tasks(user), id)

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    task
    |> Task.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Creates a task.
  """
  def create_task(attrs \\ %{status: "toDo", title: "", children: []}, after_id, user) do
    {:ok, task} = build_assoc(user, :tasks, attrs)
                  |> Repo.insert()

    case find_parent(after_id) do
      parent = %Task{} ->
        update_task(
          parent,
          %{
            children: List.insert_at(
              parent.children,
              Enum.find_index(parent.children, &(&1 == after_id)) + 1,
              task.id
            )
          }
        )
      nil ->
        root = find_root()
        update_task(root, %{children: List.insert_at(root.children, 0, task.id)})
    end

    {:ok, task}
  end

  @doc """
  Find the parent task.
  """
  def find_parent(%Task{} = task) do
    Repo.one(
      from t in Task, where: fragment("? = any(children)", ^task.id)
    )
  end
  def find_parent(task_id) do
    query = from t in Task,
                 where: fragment("? = any(children)", ^task_id)
    Repo.one(query)
  end

  @doc """
  Find the root task.
  """
  def find_root() do
    query = from t in Task,
                 where: t.root == true
    Repo.one(query)
  end

  @doc """
  Deletes a Task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    parent = find_parent(task)
    update_task(parent, %{children: List.delete(parent.children, task.id)})

    Repo.delete(task)

  end
end
