# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
echo I am provisioning...
date > /etc/vagrant_provisioned_at
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"
  config.vm.box_version = "201803.24.0"
  config.vm.provision "shell", inline: $script
end

Vagrant::Config.run do |config|
  config.vm.host_name = "postgresql"

  config.vm.share_folder "bootstrap", "/mnt/bootstrap", ".", :create => true
  config.vm.provision :shell, :path => "vagrant-setup.sh"

  # PostgreSQL Server port forwarding
  config.vm.forward_port 5432, 15432
end
