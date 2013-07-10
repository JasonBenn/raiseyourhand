ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'
require 'capybara/rspec'
require 'database_cleaner'

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }
FakeWeb.allow_net_connect = %r[^https?://127.0.0.1]


RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each, :js => true) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
    FakeWeb.clean_registry
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.order = "random"

  config.include Capybara::DSL
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new( {
      :info => {
        :name => 'Mario Brothers',
        :image => '',
        :email => 'dpsk@email.ru' },
      :uid => '12345',
      :provider => 'facebook',
      :credentials => {:token => 'token', :expires_at => 1378566562}
  })
end