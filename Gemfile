source 'https://rubygems.org'

ruby '1.9.3'

# Note: the version number might be different
gem 'rails', '3.2.13'
gem 'omniauth-facebook'

# use Postgres for db
gem 'pg'

gem 'jquery-rails'
gem 'koala'

# To use ActiveModel has_secure_password
gem 'bcrypt-ruby', '~> 3.0.0'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'uglifier', '>= 1.0.3'
end

group :development do
  gem "bullet"
  gem 'rack-mini-profiler'
end

group :development, :test do
  gem 'pry'
  gem "rspec-rails", "~> 2.0"
  gem 'capybara'
  gem 'faker'
  gem 'better_errors'
  gem "binding_of_caller"
end

group :test do
  gem 'factory_girl_rails'
  gem 'shoulda-matchers'
  gem 'guard-rspec'
  gem 'database_cleaner'
  gem 'selenium-webdriver'
end