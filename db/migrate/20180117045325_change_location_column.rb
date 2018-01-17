class ChangeLocationColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :locations, :latlon # formerly of type :point
    add_column :locations, :lonlat, :st_point, geographic: true, limit: { srid: 4326 }, null: false
  end
end
