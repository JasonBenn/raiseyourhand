FactoryGirl.define do
  factory :user do
    provider "facbook"
    sequence(:uid) { |n| "#{n}" }
    sequence(:name) { |n| "Person_#{n}" }
    sequence(:email) { |n| "person_#{n}@example.com" }
  end
end
