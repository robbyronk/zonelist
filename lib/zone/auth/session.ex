defmodule Zone.Session do
  use Ecto.Schema
  import Ecto.Changeset
  alias Zone.Session


  schema "sessions" do
    field :auth0_user, :string
    field :jwt, :string
    field :session_hash, :string

    timestamps()
  end

  @doc false
  def changeset(%Session{} = session, attrs) do
    session
    |> cast(attrs, [:session_hash, :jwt])
    |> validate_required([:session_hash, :jwt])
  end
end
