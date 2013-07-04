class CreateLessons < ActiveRecord::Migration
  def change
    create_table :lessons do |t|
      t.integer :creator_id

      t.timestamps
    end
  end
end
