class Content < ActiveRecord::Base
  attr_accessible :lesson_id
  belongs_to :lesson
  has_many :questions
  has_many :flashcards
end
