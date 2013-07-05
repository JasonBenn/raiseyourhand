class Content < ActiveRecord::Base
  attr_accessible :lesson_id, :url, :position, :start_time, :finish_time
  belongs_to :lesson
  has_many :questions
  has_many :flashcards

  def length
    finish_time.to_f - start_time.to_f
  end
end
