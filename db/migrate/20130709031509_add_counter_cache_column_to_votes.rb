class AddCounterCacheColumnToVotes < ActiveRecord::Migration
  def change
  	add_column :questions, :votes_count, :integer, :default => 0
  end
end
