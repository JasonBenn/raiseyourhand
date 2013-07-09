class Search < ActiveRecord::Base
  attr_accessible :searchable_id, :searchable_type, :term
  belongs_to :searchable, polymorphic: true
end
