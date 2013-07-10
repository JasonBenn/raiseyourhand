class AddThumbnailToContent < ActiveRecord::Migration
  def change
    add_column :contents, :thumbnail, :string
  end
end
