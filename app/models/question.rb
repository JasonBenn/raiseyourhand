class Question < ActiveRecord::Base
  include VotableHelper
  attr_accessible :content_id, :text, :time_in_content, :title
  belongs_to :content
  has_many :answers
  has_many :votes, as: :votable
end
