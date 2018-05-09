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

  def move_task(%Task{} = task, %Task{} = new_parent, new_index) do
    old_parent = find_parent(task)
    update_task(old_parent, %{children: List.delete(old_parent.children, task.id)})
    update_task(new_parent, %{children: List.insert_at(List.delete(new_parent.children, task.id), new_index, task.id)})
  end

  def move_task_before(%Task{} = task, %Task{id: before_id} = before_task) do
    with %Task{children: parent_siblings} = new_parent <- find_parent(before_task) do
      move_task(task, new_parent, Enum.find_index(List.delete(parent_siblings, task.id), &match?(^before_id, &1)))
    else
      nil -> {:error, "could not move #{task.id}"}
    end
  end

  def move_task_after(%Task{} = task, %Task{id: after_id} = after_task) do
    with %Task{children: parent_siblings} = new_parent <- find_parent(after_task) do
      move_task(task, new_parent, Enum.find_index(List.delete(parent_siblings, task.id), &match?(^after_id, &1)) + 1)
    else
      nil -> {:error, "could not move #{task.id}"}
    end
  end

  def previous_sibling(%Task{id: task_id} = task) do
    %Task{children: siblings} = find_parent(task)

    case Enum.find_index(siblings, &match?(^task_id, &1)) do
      0 -> {:error, "the index of the task to indent was zero"}
      i -> get_task!(Enum.fetch!(siblings, i - 1))
    end
  end

  def indent_task(%Task{} = task) do
    case previous_sibling(task) do
      sibling = %Task{} -> move_task(task, sibling, -1)
      {:error, reason} -> {:error, reason}
    end
  end

  def unindent_task(%Task{} = task) do
    with %Task{id: parent_id} = parent <- find_parent(task),
         %Task{children: parent_siblings} = grand_parent <- find_parent(parent) do
      move_task(task, grand_parent, Enum.find_index(parent_siblings, &match?(^parent_id, &1)) + 1)
    else
      nil -> {:error, "could not unindent #{task.id}"}
    end
  end
end
