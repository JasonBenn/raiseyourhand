class Flashcard < ActiveRecord::Base
  attr_accessible :back, :content_id, :front, :time_in_content
  belongs_to :content
end
