class Doctor < ActiveRecord::Base
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

  has_many :patient_doctors

  has_many :patients,
    through: :patient_doctors,
    source: :patient

  has_many :authored_conversations,
    as: :author,
    class_name: :Conversation

  has_many :recipient_conversations,
    as: :recipient,
    class_name: :Conversation

  def self.find_by_credentials(email, password)
    doctor = Doctor.find_by(email: email)
    return nil unless doctor
    doctor.is_password?(password) ? doctor : nil
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
  
  def name
    self.first_name + " " + self.last_name
  end

  def authored_threads
    self.authored_conversations.where(parent_id: nil)
  end

  def received_threads
    self.recipient_conversations.where(parent_id: nil)
  end

  private
  def new_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def ensure_session_token_uniqueness
    while Doctor.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
  end
end
