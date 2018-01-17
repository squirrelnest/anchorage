class CreateAnchorages < ActiveRecord::Migration[5.1]
  def change
    create_table :anchorages do |t|
      t.point :coordinate

    end
  end
end
