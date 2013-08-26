class Search < ActiveRecord::Base
  attr_accessible :searchable_id, :searchable_type, :term
  belongs_to :searchable, polymorphic: true
  validates_uniqueness_of :term, scope: [:searchable_id, :searchable_type]

  def self.search(query)
    Rails.cache.fetch(query) do
      results = select("DISTINCT searchable_id, searchable_type").
        where('term LIKE ?', '%' + query + '%').
        includes(:searchable)
      records = results.map(&:searchable)
      records.partition { |record| record.is_a? Lesson }
    end
  end
end
