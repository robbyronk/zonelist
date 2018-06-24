# ZoneList
ZoneList is a hierarchical to-do list with a mode to encourage focusing on one thing at a time.

An online demo is available at [https://app.zonefocus.xyz](https://app.zonefocus.xyz)

ZoneList is built with Phoenix and React.

### Getting Started

#### Prerequisites for local development:
- [VirtualBox](https://www.virtualbox.org/)
- [Vagrant](https://www.vagrantup.com/)
- [Elixir](https://elixir-lang.org/)
- [Node.js](https://nodejs.org/)

#### Running ZoneList locally:

Vagrant creates a virtual machine using VirtualBox to host a PostgreSQL database.

To start the database run `vagrant up`. This will take a while the first time.

To install the Elixir and Node.js dependencies run `mix zone.setup`

To start the app run `mix phx.server`

Open [http://localhost:4000/](http://localhost:4000/) and try it out!
