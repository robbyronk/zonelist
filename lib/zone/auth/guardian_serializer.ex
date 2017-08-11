defmodule Zone.GuardianSerializer do
  require Logger
  @behaviour Guardian.Serializer

  def for_token([connection_type, user_id]), do: { :ok, "UserAuth:#{user_id}" }
  def for_token([_]), do: {:error, "Bad token"}
  def for_token(auth0_token), do: for_token String.split(auth0_token, "|")

  def from_token([connection_type, user_id]), do: { :ok, Zone.User.find_or_create(%Zone.User{auth0_user: user_id}) }
  def from_token([_]), do: { :error, "Unknown resource type" }
  def from_token(auth0_token), do: from_token String.split(auth0_token, "|")
end
