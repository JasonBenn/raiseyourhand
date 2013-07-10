class Answer < ActiveRecord::Base
  include VotableHelper
  attr_accessible :question_id, :text
  belongs_to :question, counter_cache: true
  belongs_to :user
  has_many :votes, as: :votable
  validates_presence_of :question, :user
end
