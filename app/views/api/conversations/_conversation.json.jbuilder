json.extract!(
  conversation,
  :author_id,
  :author_type,
  :recipient_id,
  :recipient_type,
  :parent_id,
  :subject,
  :body
)

json.responses do
  json.array!(conversation.responses) do |response|
    json.partial!('api/conversations/conversation', conversation: response)
  end
end
