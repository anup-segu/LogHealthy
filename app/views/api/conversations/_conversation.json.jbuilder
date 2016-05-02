json.extract!(
  conversation,
  :id,
  :author_id,
  :author_type,
  :recipient_id,
  :recipient_type,
  :parent_id,
  :subject,
  :body,
  :created_at
)

json.author conversation.author.name
json.recipient conversation.recipient.name

json.responses do
  json.array!(conversation.responses) do |response|
    json.partial!(
      'api/conversations/conversation',
      conversation: response
    )
  end
end
