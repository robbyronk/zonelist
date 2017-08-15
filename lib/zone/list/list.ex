defmodule Zone.List do
  @moduledoc """
  The List context. Contains Tasks and Task related functions.
  """

  alias Zone.List.Task
  alias Zone.Repo

  def get_task!(id), do: Repo.get!(Task, id)
end
