class Lesson < ActiveRecord::Base
  include VotableHelper
  include Indexer

  attr_accessible :creator_id, :title, :contents_attributes
  
  belongs_to :creator, class_name: "User"
  has_many :user_lessons
  has_many :users, through: :user_lessons
  has_many :questions, through: :contents
  has_many :votes, as: :votable
  has_many :searches, as: :searchable
  has_many :contents, inverse_of: :lesson, dependent: :destroy
  validates_presence_of :title, :contents

  accepts_nested_attributes_for :contents, :reject_if => lambda { |a| a[:url].blank? }, :allow_destroy => true
  
  after_save :index_attributes

  def relevant_search_result_info
    users.size
  end
end
