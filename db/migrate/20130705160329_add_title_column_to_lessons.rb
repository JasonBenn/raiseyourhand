class AddTitleColumnToLessons < ActiveRecord::Migration
  def change
    add_column :lessons, :title, :string
  end
end
