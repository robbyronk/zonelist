defmodule ZoneWeb.LayoutView do
  use ZoneWeb, :view

  def js_script_tag do
    if System.get_env("production") == "true" do
      ~s(<script src="/js/app.js"></script>)
    else
      ~s(<script src="http://localhost:4001/js/app.js"></script>)
    end
  end

  def css_link_tag do
    if System.get_env("production") == "true" do
      ~s(<link rel="stylesheet" type="text/css" href="/css/app.css" media="screen,projection" />)
    else
      ""
    end
  end
end
