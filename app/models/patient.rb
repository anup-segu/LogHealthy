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
