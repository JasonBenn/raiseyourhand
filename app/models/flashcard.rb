class Flashcard < ActiveRecord::Base
  attr_accessible :back, :content_id, :front, :time_in_lesson
  belongs_to :content
  validates_presence_of :time_in_lesson, :content, :front, :back
end
