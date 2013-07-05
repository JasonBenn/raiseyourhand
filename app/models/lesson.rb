class Lesson < ActiveRecord::Base
  attr_accessible :creator_id
  has_many :user_lessons
  has_many :users, through: :user_lessons
  belongs_to :creator, class_name: "User"

  has_many :contents
end
