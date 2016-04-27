class CreateDoctors < ActiveRecord::Migration
  def change
    create_table :doctors do |t|
      t.string :email, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false

      t.timestamps null: false
    end

    add_index :doctors, :email, unique: true
    add_index :doctors, :session_token, unique: true
    add_index :doctors, :first_name
    add_index :doctors, :last_name
  end
end
