use Mix.Releases.Config,
    # This sets the default release built by `mix release`
    default_release: :default,
    # This sets the default environment used by `mix release`
    default_environment: :dev

# For a full list of config options for both releases
# and environments, visit https://hexdocs.pm/distillery/configuration.html


# You may define one or more environments in this file,
# an environment's settings will override those of a release
# when building in that environment, this combination of release
# and environment configuration is called a profile

environment :dev do
  set dev_mode: true
  set include_erts: false
  set cookie: :"k/kN{~{o.kVyqGbQw2g0`[?y;JxZu0g!.h=zOyJ}?tuBX17[d{hH5$1o1eh{pxbZ"
end

environment :prod do
  set include_erts: true
  set include_src: false
  set cookie: :"wxH0Z;R!~<)J?CA%!YJ[.D@xW3w,sg6mSlXNf~d*h3X;JGo(GUA4QxK9Vcf:&HKb"
end

# You may define one or more releases in this file.
# If you have not set a default release, or selected one
# when running `mix release`, the first release in the file
# will be used by default

release :zone do
  set version: current_version(:zone)
end

