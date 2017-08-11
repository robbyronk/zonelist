defmodule Zone.Repo.Migrations.CreateZone.Task do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :text
      add :status, :string
      add :children, {:array, :integer}, default: []
      add :user_id, :integer

      timestamps()
    end

  end
end
