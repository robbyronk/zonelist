defmodule Zone.Repo.Migrations.CreateZone.Session do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :session_hash, :string
      add :jwt, :string

      timestamps()
    end

  end
end
