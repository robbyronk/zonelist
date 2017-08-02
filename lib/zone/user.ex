defmodule Zone.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Zone.User


  schema "users" do
    field :auth0_token, :string
    field :email, :string

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :auth0_token])
    |> validate_required([:email, :auth0_token])
  end
end
