class Patient < ActiveRecord::Base
  attr_reader :password

  validates :email,
    :first_name,
    :last_name,
    :password_digest,
    :session_token, presence: true

  validates :email, :session_token, uniqueness: true

  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  before_validation :ensure_session_token_uniqueness

  has_many :logs

  has_one :patient_doctor

  has_one :doctor,
    through: :patient_doctor,
    source: :doctor

  has_many :authored_conversations,
    as: :author,
    class_name: :Conversation

  has_many :recipient_conversations,
    as: :recipient,
    class_name: :Conversation

  def self.find_by_credentials(email, password)
    patient = Patient.find_by(email: email)
    return nil unless patient
    patient.is_password?(password) ? patient : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = new_session_token
    self.save
    self.session_token
  end

  def logs_hash
    results = {}

    self.logs.order("date DESC").each do |log|
      date = log.date.to_formatted_s(:long)
      results[date] = {} if results[date].nil?
      results[date][log.meal_type] = log
    end

    results
  end

  def name
    self.first_name + " " + self.last_name
  end

  def authored_threads
    self.authored_conversations.where(parent_id: nil)
  end

  def received_threads
    self.recipient_conversations.where(parent_id: nil)
  end

  def doctor_extract
    doctor = {}
    doctor["id"] = self.doctor.id
    doctor["first_name"] = self.doctor.first_name
    doctor["last_name"] = self.doctor.last_name
    doctor["last_name"] = self.doctor.last_name
    doctor["email"] = self.doctor.email
    doctor["ttype"] = self.doctor.ttype
    doctor
  end

  private
  def new_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def ensure_session_token_uniqueness
    while Patient.find_by(session_token: self.session_token)
			self.session_token = new_session_token
		end
  end
end
