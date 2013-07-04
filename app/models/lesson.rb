class Lesson < ActiveRecord::Base
  attr_accessible :creator_id
  has_many :users_lessons
  has_many :users, through: :users_lessons
  belongs_to :user

  has_many :contents
end
