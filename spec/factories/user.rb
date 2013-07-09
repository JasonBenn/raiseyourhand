FactoryGirl.define do
  factory :user do
    provider 'facbook'
    uid '12345'
    name 'Mario Brothers'
    email 'dpsk@email.ru'
    oauth_token 'token'
    oauth_expires_at Time.at(1378566562)
  end
end

