defmodule Zone.List do
  @moduledoc false
  alias Zone.List.Task
  alias Zone.Repo

  def get_task!(id), do: Repo.get!(Task, id)
end
