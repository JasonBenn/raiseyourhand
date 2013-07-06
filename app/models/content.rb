class Content < ActiveRecord::Base
  attr_accessible :lesson_id, :url, :start_time, :finish_time, :position
  belongs_to :lesson
  has_many :questions
  has_many :flashcards

end
