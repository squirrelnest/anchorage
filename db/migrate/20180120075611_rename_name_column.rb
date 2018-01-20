class RenameNameColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :locations, :name, :nickname
  end
end
