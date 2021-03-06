defmodule Zone.List.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Zone.List.Task
  alias Zone.Auth.User
  alias Zone.Repo


  schema "tasks" do
    field :children, {:array, :integer}
    field :status, :string
    field :title, :string
    field :root, :boolean

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:title, :status, :children])
    |> validate_required([])
  end
end
