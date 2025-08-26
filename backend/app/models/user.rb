class User < ApplicationRecord
  has_many :murmurs, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_murmurs, through: :likes, source: :murmur

  has_many :active_follows, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :passive_follows, class_name: 'Follow', foreign_key: 'followed_id', dependent: :destroy
  has_many :following, through: :active_follows, source: :followed
  has_many :followers, through: :passive_follows, source: :follower

  validates :name, :username, presence: true
  validates :username, uniqueness: true
end
