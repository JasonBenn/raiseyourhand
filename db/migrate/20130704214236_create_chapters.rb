class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.integer :content_id
      t.string :start_time
      t.string :end_time

      t.timestamps
    end
  end
end
