class CreateFlashcards < ActiveRecord::Migration
  def change
    create_table :flashcards do |t|
      t.integer :content_id
      t.string :front
      t.string :back
      t.string :time_in_content

      t.timestamps
    end
  end
end
