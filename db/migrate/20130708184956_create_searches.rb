class CreateSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.string :term
      t.references :searchable, polymorphic: true

      t.timestamps
    end
  end
end
