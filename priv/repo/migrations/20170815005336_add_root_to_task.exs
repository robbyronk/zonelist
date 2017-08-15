defmodule Zone.Repo.Migrations.AddRootToTask do
  use Ecto.Migration

  def change do
    alter table(:tasks) do
      add :root, :boolean, default: false
    end
  end
end
