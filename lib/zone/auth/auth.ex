defmodule Zone.Auth do
  @moduledoc false
  import Ecto.Query
  alias Zone.Auth.User
  alias Zone.Repo

  def create_user(user) do
    Repo.insert!(user)
    # todo add sample tasks for this user
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
