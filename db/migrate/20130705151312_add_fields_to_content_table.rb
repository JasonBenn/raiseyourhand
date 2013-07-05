class AddFieldsToContentTable < ActiveRecord::Migration
  def change
  	add_column :contents, :url, :string
  	add_column :contents, :position, :string
  	add_column :contents, :start_time, :string
  	add_column :contents, :finish_time, :string 
  end
end
