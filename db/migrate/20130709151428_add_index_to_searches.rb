class AddIndexToSearches < ActiveRecord::Migration
  def change
  	add_index :searches, :term
  	add_index :searches, :searchable_id
  	add_index :searches, :searchable_type
  end
end
