class Chapter < ActiveRecord::Base
  attr_accessible :content_id, :end_time, :start_time
  belongs_to :content
end
