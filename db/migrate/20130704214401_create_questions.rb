class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :text
      t.integer :content_id
      t.string :time_in_content

      t.timestamps
    end
  end
end
