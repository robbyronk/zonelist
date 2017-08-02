defmodule Zone.Repo.Migrations.CreateZone.User do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :auth0_token, :string

      timestamps()
    end

  end
end
