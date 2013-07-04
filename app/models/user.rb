class User < ActiveRecord::Base
  attr_accessible :email, :first_name, :last_name
  has_many :users_lessons
  has_many :lessons, through: :users_lessons
  has_many :created_lessons, class_name: :lessons
end
