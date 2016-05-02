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

  # def self.outbox(id, ttype)
  #   self.where(parent_id: nil, author_id: id, author_type: ttype)
  # end
  #
  # def self.inbox(id, ttype)
  #   self.where(parent_id: nil, recipient_id: id, recipient_type: ttype)
  # end

  def parent_conversation
    return self if self.parent_id.nil?
    Conversation.find(self.parent_id).parent_conversation
  end
end
