class Conversation < ActiveRecord::Base
  validates :author_id,
    :author_type,
    :recipient_id,
    :recipient_type,
    :body, presence: true

  validates :author_type,
    :recipient_type, inclusion: { in: ["Doctor", "Patient"] }

  belongs_to :author, polymorphic: true
  belongs_to :recipient, polymorphic: true

  has_many :responses,
    primary_key: :id,
    foreign_key: :parent_id,
    class_name: :Conversation

  def parent_conversation
    return self if self.parent_id.nil?
    Conversation.find(self.parent_id).parent_conversation
  end
end
