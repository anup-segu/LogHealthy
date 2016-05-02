class Api::ConversationsController < ApplicationController
  def index
    if (current_user.nil?)
      @errors = ["No user logged in"]
      render "api/shared/error", status: 422
    end
    @inbox = current_user.received_threads
    @outbox = current_user.authored_threads
    render "api/conversations/index"
  end

  def create
    @conversation = Conversation.new(conversation_params)

    if current_patient
      @conversation.author_id = current_patient.id
      @conversation.author_type = "Patient"
    elsif current_doctor
      @conversation.author_id = current_doctor.id
      @conversation.author_type = "Doctor"
    end

    if @conversation.save
      @parent_conversation = @conversation.parent_conversation
      render "api/conversations/show"
    else
      @errors = @conversation.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  private
  def conversation_params
    params.require(:conversation)
      .permit(
        :recipient_id,
        :recipient_type,
        :parent_id,
        :subject,
        :body
      )
  end
end
