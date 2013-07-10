class AddVotesCountToLessons < ActiveRecord::Migration
  def change
  	add_column :lessons, :votes_count, :integer, :default => 0
  end
end
