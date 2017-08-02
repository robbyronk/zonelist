defmodule Zone.Repo.Migrations.ModifyJwtText do
  use Ecto.Migration

  def change do
    alter table(:sessions) do
      modify :jwt, :text
    end
  end
end
