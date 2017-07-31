defmodule Zone.Web.PageController do
  use Zone.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def auth_callback(conn, _params) do
    conn
    |> put_layout("auth.html")
    |> render("index.html")
  end
end
