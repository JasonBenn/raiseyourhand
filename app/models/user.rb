class User < ActiveRecord::Base
  attr_accessible :email, :oauth_token
  has_many :user_lessons
  has_many :lessons, through: :user_lessons
  has_many :created_lessons, class_name: 'Lesson', foreign_key: 'creator_id'
  has_many :votes
  has_many :questions
  has_many :answers

  validates_presence_of :oauth_token, :uid, :name

  def self.from_omniauth(auth)
    where(uid: auth.uid).first_or_initialize do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end
