class Vote < ActiveRecord::Base
  belongs_to :votable, polymorphic: true, counter_cache: true
  belongs_to :user
  attr_accessible :direction, :user_id, :votable_id, :votable_type
end
