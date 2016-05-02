class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :author_id, null: false
      t.string :author_type, null: false
      t.integer :recipient_id, null: false
      t.string :recipient_type, null: false
      t.integer :parent_id
      t.string :subject
      t.text :body, null: false

      t.timestamps null: false
    end

    add_index :conversations, :author_id
    add_index :conversations, :recipient_id
    add_index :conversations, :parent_id
  end
end
