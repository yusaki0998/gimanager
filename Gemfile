source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"
gem "rails", "~> 7.0.4"

gem "sprockets-rails"
gem "mysql2", "~> 0.5"
gem "puma", "~> 5.0"
gem "turbo-rails"
gem "jbuilder"
gem "redis", "~> 4.0"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
gem "bootsnap", require: false
gem "devise", "~> 4.8"

gem 'turbolinks', '~> 5.2.0'
gem 'webpacker', '~> 5.x'
gem 'bootstrap', '~> 5.2.0'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'jquery-turbolinks'
gem 'jstreejs-rails'
gem 'bootstrap_tokenfield_rails'

gem 'rails-i18n', '~> 7.0.0'
gem "cocoon"
gem "tabs_on_rails"
gem 'carrierwave'
gem 'cancancan'
gem 'capistrano', '~> 3.11'
gem 'capistrano-rails', '~> 1.4'
gem 'capistrano-passenger', '~> 0.2.0'
gem 'capistrano-rbenv', '~> 2.1', '>= 2.1.4'
gem 'capistrano-secrets-yml'
  gem 'net-ssh', '>= 6.0.2'
  gem 'ed25519', '>= 1.2', '< 2.0'
  gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'
  gem 'pry'
group :development, :test do
  gem 'sqlite3'
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem 'pry-rails'
  
  # gem deploy
  gem "capistrano", "~> 3.17"
  gem "capistrano-rails", "~> 1.6", ">= 1.6.2"
  gem "capistrano-rbenv", "~> 2.2"
  gem "capistrano-passenger", "~> 0.2.1"

  gem 'net-ssh', '>= 6.0.2'
  gem 'ed25519', '>= 1.2', '< 2.0'
  gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
