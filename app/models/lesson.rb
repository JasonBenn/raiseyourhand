class Lesson < ActiveRecord::Base
  attr_accessible :creator_id, :title, :contents_attributes
  has_many :user_lessons
  has_many :users, through: :user_lessons
  has_many :questions, through: :contents
  belongs_to :creator, class_name: "User"

  has_many :contents, dependent: :destroy
  accepts_nested_attributes_for :contents, :reject_if => lambda { |a| a[:url].blank? }, :allow_destroy => true
end
