defmodule Zone.GuardianSerializer do
  @behaviour Guardian.Serializer

  def for_token(user_auth = %{}), do: { :ok, "UserAuth:#{user_auth.id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token("UserAuth:" <> id), do: { :ok, %{id: id} }
  def from_token(_), do: { :error, "Unknown resource type" }
end
