defmodule ZoneWeb.UsersChannel do
  use ZoneWeb, :channel
  require Logger

  def join("users:" <> user_channel_id, payload, socket) do
    Logger.debug("something #{inspect(user_channel_id)} #{inspect(socket.assigns.current_user)}")
    if socket.assigns.current_user.id == String.to_integer(user_channel_id) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end
end
