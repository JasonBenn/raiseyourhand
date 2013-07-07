class Content < ActiveRecord::Base
  attr_accessible :lesson_id, :url, :position, :start_time, :finish_time
  belongs_to :lesson, inverse_of: :contents
  has_many :questions
  has_many :flashcards
 	validates_presence_of :lesson
	validates_associated :lesson
 	validates :position, numericality: true

  def length
    finish_time.to_f - start_time.to_f
  end
end
