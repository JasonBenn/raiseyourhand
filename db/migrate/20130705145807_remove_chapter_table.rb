class RemoveChapterTable < ActiveRecord::Migration
  def up
  	drop_table :chapters
  end

  def down
  	create_table :chapters do |t|
      t.integer :content_id
      t.string :start_time
      t.string :end_time

      t.timestamps
    end
  end
end
