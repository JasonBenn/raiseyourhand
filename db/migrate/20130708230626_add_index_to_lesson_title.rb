class AddIndexToLessonTitle < ActiveRecord::Migration
  def change
  	add_index :lessons, :title
  end
end
