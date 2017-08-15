defmodule Zone.List.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Zone.List.Task


  schema "tasks" do
    field :children, {:array, :integer}
    field :status, :string
    field :title, :string
    field :root, :boolean

    belongs_to :user, Zone.User

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:title, :status, :children])
    |> validate_required([:title, :status, :children])
  end
end
