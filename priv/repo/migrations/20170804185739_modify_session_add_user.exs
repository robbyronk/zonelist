defmodule Zone.Repo.Migrations.ModifySessionAddUser do
  use Ecto.Migration

  def change do
    alter table(:sessions) do
      add :auth0_user, :string
    end

    alter table(:users) do
      add :auth0_user, :string
    end
  end
end
