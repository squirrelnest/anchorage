class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, unique: true
      t.string :password_digest
      t.column :created_at, :timestamptz, null: false
    end
  end
end
