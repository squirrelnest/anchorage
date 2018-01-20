class AddForeignKeys < ActiveRecord::Migration[5.1]
  def change
    add_column :reviews, :location_id, :integer, null: false
    add_column :reviews, :user_id, :integer, null: false
  end
end
