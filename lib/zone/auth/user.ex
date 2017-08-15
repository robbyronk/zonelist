defmodule Zone.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Zone.Auth.User


  schema "users" do
    field :auth0_user, :string
    field :auth0_token, :string
    field :email, :string

    has_many :tasks, Zone.List.Task

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :auth0_token])
    |> validate_required([:email, :auth0_token])
  end
end
