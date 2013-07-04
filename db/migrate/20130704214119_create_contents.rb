class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.integer :lesson_id

      t.timestamps
    end
  end
end
