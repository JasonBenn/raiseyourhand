class UserLesson < ActiveRecord::Base
  attr_accessible :lesson_id, :user_id
  belongs_to :user
  belongs_to :lesson
end
