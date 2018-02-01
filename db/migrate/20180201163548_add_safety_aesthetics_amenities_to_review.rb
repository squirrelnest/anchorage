class AddSafetyAestheticsAmenitiesToReview < ActiveRecord::Migration[5.1]
  def change
    add_column :reviews, :safety, :integer
    add_column :reviews, :aesthetics, :integer
    add_column :reviews, :amenities, :integer
  end
end
