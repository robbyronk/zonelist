# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :zone,
  ecto_repos: [Zone.Repo]

# Configures the endpoint
config :zone, ZoneWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "KTQKp0DVQOGhrnTMeCCN6JR7Dh1F5Kde08JfSkgW3Zcp0aCxacccbLJa2RZPGHQK",
  render_errors: [view: ZoneWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Zone.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  allowed_algos: ["RS256"],
  secret_key: %{
    #auth0 public key
    "alg" => "RS256",
    "kty" => "RSA",
    "use" => "sig",
    "x5c" => [
      "MIIC/TCCAeWgAwIBAgIJPN9rZaQTFdaZMA0GCSqGSIb3DQEBCwUAMBwxGjAYBgNVBAMTEXpvbmUuYXUuYXV0aDAuY29tMB4XDTE3MDcyMjEwNTU1OFoXDTMxMDMzMTEwNTU1OFowHDEaMBgGA1UEAxMRem9uZS5hdS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDBsuIEUHYoc2Vrw29+kMFax/hNVwnNAbQtO+qeKVQx0UnPnT5flI6LFUrfQ3Qjnc4wrqjPoOn+/K5IR4gtepbuEuMVfVsGb7btz6ow2jUGSVzo7zKTKKHzV77VvCobeLMYupJOECXnVUMMuEE7Gia/wtGimcrSI10ROPMq7AGfAILSCrrEvkRAsfKAunb2sceifft3D6wZ2wHovVxltBT6nqcLCvDmx1+EQ4PDVmircqcZVhoXfpRL5Ut8V+nVhhGxtXS+JiKFnGzsaqSj0TLPHfMGGmSVGVporSr/NaydKAIC36w7GcPFdNyZ1QB4wLuZHUfzc8lrXKyaQo1WDzPXAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFHdaCJnflz8pmb0I2vEqVOes4+2lMA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEApgh0c+0mZCB1HZwGp0/njgbHm7NvaBJelmFxB8Uyn7K3mVGTMiahdyWGNt4BgOFtlbW/W+4/A2k4aZv3idSpvx0Av2N+tqEUdJUr3lIb1dqRe1kICVD7clFy3IFWSdDHoNNNFarzVpiOhddhSprhzeVcuJ2XzWnYsY2T2CNKPVjaaIDtA+sqwXhtu0rB4WmsWEb03cwfXOj9rAbEFoM1gpPSUwmi0Ni6BlxGVmEA843Lk06k4teS3Yp5NuTrF03GClXJ9W+lJTjscPYrPyN+m+ZOzDb12N4U8qirDSIZc3IB3U2I3k/DirbR9ONgPeUVH4Z+iyWlN1vUtdct2R/KaA=="
    ],
    "n" => "wbLiBFB2KHNla8NvfpDBWsf4TVcJzQG0LTvqnilUMdFJz50-X5SOixVK30N0I53OMK6oz6Dp_vyuSEeILXqW7hLjFX1bBm-27c-qMNo1Bklc6O8ykyih81e-1bwqG3izGLqSThAl51VDDLhBOxomv8LRopnK0iNdETjzKuwBnwCC0gq6xL5EQLHygLp29rHHon37dw-sGdsB6L1cZbQU-p6nCwrw5sdfhEODw1Zoq3KnGVYaF36US-VLfFfp1YYRsbV0viYihZxs7Gqko9Eyzx3zBhpklRlaaK0q_zWsnSgCAt-sOxnDxXTcmdUAeMC7mR1H83PJa1ysmkKNVg8z1w",
    "e" => "AQAB",
    "kid" => "RUJCQjE5MkFDQTIxQkE5ODRFMjcwODFERjFENUFCMjM0NDNERUVFMA",
    "x5t" => "RUJCQjE5MkFDQTIxQkE5ODRFMjcwODFERjFENUFCMjM0NDNERUVFMA"
  },
  serializer: Zone.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
