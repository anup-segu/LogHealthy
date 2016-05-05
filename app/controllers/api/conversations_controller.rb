class Api::ConversationsController < ApplicationController
  def index
    if (params[:ttype] == "Patient")
      patient = Patient.find(params[:id])
      @inbox = patient.received_threads
      @outbox = patient.authored_threads
      render "api/conversations/index"
    else
      doctor = Doctor.find(params[:id])
      @inbox = doctor.received_threads
      @outbox = doctor.authored_threads
      render "api/conversations/index"
    end
  end

  def create
    @conversation = Conversation.new(conversation_params)

    if @conversation.save
      if @conversation.author_type == "Doctor"
        user = Doctor.find(@conversation.author_id)
      else
        user = Patient.find(@conversation.author_id)
      end

      @inbox = user.received_threads
      @outbox = user.authored_threads
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
        :author_id,
        :author_type,
        :recipient_id,
        :recipient_type,
        :parent_id,
        :subject,
        :body
      )
  end
end
