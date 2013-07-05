class User < ActiveRecord::Base
  attr_accessible :email, :oauth_token
  has_many :user_lessons
  has_many :lessons, through: :user_lessons
  has_many :created_lessons, class_name: 'Lesson', foreign_key: 'creator_id'

  validates :oauth_token, presence: true

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
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
