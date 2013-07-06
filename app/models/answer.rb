class Answer < ActiveRecord::Base
  include VotableHelper
  attr_accessible :question_id, :text
  belongs_to :question
  has_many :votes, as: :votable
end
