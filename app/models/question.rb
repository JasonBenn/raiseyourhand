class Question < ActiveRecord::Base
  include VotableHelper
  include Indexer

  attr_accessible :content_id, :text, :time_in_content, :title

  belongs_to :content
  belongs_to :user
  delegate :lesson_id, to: :content
  belongs_to :searchable, polymorphic: true
  has_many :answers
  has_many :votes, as: :votable

  after_save :index_attributes
end
