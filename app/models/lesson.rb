class Lesson < ActiveRecord::Base
  include VotableHelper
  attr_accessible :creator_id, :title, :contents_attributes
  has_many :user_lessons
  has_many :users, through: :user_lessons
  has_many :questions, through: :contents
  belongs_to :creator, class_name: "User"
  has_many :votes, as: :votable

  has_many :contents, inverse_of: :lesson, dependent: :destroy
  accepts_nested_attributes_for :contents, :reject_if => lambda { |a| a[:url].blank? }, :allow_destroy => true

  searchable do
  	text :title
  end
end
