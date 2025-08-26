class Murmur < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :liked_by, through: :likes, source: :user

  validates :content, presence: true, length: { maximum: 280 }
end
