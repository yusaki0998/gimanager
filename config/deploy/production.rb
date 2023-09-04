server_str = "178.128.60.109"
user_str = "deploy"

role :app, "#{user_str}@#{server_str}"
role :web, "#{user_str}@#{server_str}"
role :db, "#{user_str}@#{server_str}"

server server_str, user: user_str, roles: %w[web app]

set :branch, "main"
set :rails_env, "production"
set :linked_files, %w[database.yml].map { |str| "config/#{str}" }

set :deploy_to, "~/deploy-gimanager"
set :passenger_restart_command,
  "touch /home/#{user_str}/deploy-gimanager/current/tmp/restart.txt"