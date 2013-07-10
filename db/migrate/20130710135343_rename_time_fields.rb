class RenameTimeFields < ActiveRecord::Migration
  def up
  	rename_column :questions, :time_in_content, :time_in_lesson
  	rename_column :flashcards, :time_in_content, :time_in_lesson
  end

  def down
  	rename_column :questions, :time_in_lesson, :time_in_content
  	rename_column :flashcards, :time_in_lesson, :time_in_content
  end
end

