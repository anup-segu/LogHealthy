class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.string :email, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false

      t.timestamps null: false
    end

    add_index :patients, :email, unique: true
    add_index :patients, :session_token, unique: true
    add_index :patients, :first_name
    add_index :patients, :last_name
  end
end
