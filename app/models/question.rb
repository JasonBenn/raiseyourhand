class Question < ActiveRecord::Base
  include VotableHelper
  include Indexer

  attr_accessible :content_id, :text, :time_in_content, :title
  belongs_to :content
  has_many :answers
  has_many :votes, as: :votable
  belongs_to :searchable, polymorphic: true

  after_save :index_attributes
end
