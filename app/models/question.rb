class Question < ActiveRecord::Base
  attr_accessible :content_id, :text, :time_in_content, :title
  belongs_to :content
  has_many :answers
end
