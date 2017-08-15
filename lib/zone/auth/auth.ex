defmodule Zone.Auth do
  @moduledoc false
  import Ecto.Query
  alias Zone.Auth.User
  alias Zone.List.Task
  alias Zone.Repo

  def create_user(user) do
    user = Repo.insert!(user)

    task1 = %Task{title: "Your Zone", status: "toDo", root: true, user: user}
    task1 = Repo.insert!(task1)
    task2 = %Task{title: "Make an outline", status: "toDo", user: user}
    task2 = Repo.insert!(task2)
    task3 = %Task{title: "Focus on one task at a time", status: "toDo", user: user}
    task3 = Repo.insert!(task3)
    task4 = %Task{title: "Finish", status: "toDo", user: user}
    task4 = Repo.insert!(task4)

    Task.changeset(task1, %{children: [task2.id, task3.id, task4.id]})
    |> Repo.update!

    user
  end

  def find_or_create(user) do
    query = from u in User,
            where: u.auth0_user == ^user.auth0_user
    case Repo.one(query) do
      u = %User{} -> u
      nil -> create_user(user)
    end
  end
end
