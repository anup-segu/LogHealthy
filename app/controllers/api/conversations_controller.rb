class Api::ConversationsController < ApplicationController
  def index
    puts params[:ttype]
    puts params[:id]
    if (params[:ttype] == "Patient")
      patient = Patient.find(params[:id])
      @inbox = patient.received_threads
      @outbox = patient.authored_threads
      render "api/conversations/index"
    else
      @inbox = current_user.received_threads
      @outbox = current_user.authored_threads
      render "api/conversations/index"
    end
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
      # @parent_conversation = @conversation.parent_conversation
      @inbox = current_user.received_threads
      @outbox = current_user.authored_threads
      render "api/conversations/index"
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
