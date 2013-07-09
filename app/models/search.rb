class Search < ActiveRecord::Base
  attr_accessible :searchable_id, :searchable_type, :term
  belongs_to :searchable, polymorphic: true
  # validates_uniqueness_of :term, scope: [:searchable_id, :searchable_type]

  def self.search(query)
  	where('term LIKE ?', '%' + query + '%')
  end
end
