class AddDurationToContent < ActiveRecord::Migration
  def change
    add_column :contents, :duration, :string
  end
end
