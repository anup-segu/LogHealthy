json.inbox do
  json.array!(@inbox) do |conversation|
    json.partial!(
      'api/conversations/conversation',
      conversation: conversation
    )
  end
end

json.outbox do
  json.array!(@outbox) do |conversation|
    json.partial!(
      'api/conversations/conversation',
      conversation: conversation
    )
  end
end
