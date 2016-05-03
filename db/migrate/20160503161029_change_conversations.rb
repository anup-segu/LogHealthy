class ChangeConversations < ActiveRecord::Migration
  def change
    change_column :conversations, :subject, :string, default: "(No Subject)"
  end
end
