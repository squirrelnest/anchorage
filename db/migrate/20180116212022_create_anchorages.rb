class CreateAnchorages < ActiveRecord::Migration[5.1]
  def change
    create_table :anchorages do |t|
      t.point :lonlat
    end
  end
end
