defmodule Zone.Web.PageController do
  use Zone.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
