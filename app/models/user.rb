class User < ActiveRecord::Base
  attr_accessible :email, :first_name, :last_name
  has_many :user_lessons
  has_many :lessons, through: :user_lessons
  has_many :created_lessons, class_name: :lessons
end
