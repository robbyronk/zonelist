defmodule Zone.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias Zone.User


  schema "users" do
    field :auth0_user, :string
    field :auth0_token, :string
    field :email, :string

    has_many :tasks, Zone.Task

    timestamps()
  end

  def create(user) do
    Zone.Repo.insert!(user)
    # todo add sample tasks for this user
  end

  def find_or_create(user) do
    query = from u in User,
            where: u.auth0_user == ^user.auth0_user
    case Zone.Repo.one(query) do
      u = %User{} -> u
      nil -> create(user)
    end
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :auth0_token])
    |> validate_required([:email, :auth0_token])
  end
end
