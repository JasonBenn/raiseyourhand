class CreateFlashcards < ActiveRecord::Migration
  def change
    create_table :flashcards do |t|
      t.integer :content_id
      t.text :front
      t.text :back
      t.string :time_in_content

      t.timestamps
    end
  end
end
