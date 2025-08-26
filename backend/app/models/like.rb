class Like < ApplicationRecord
  belongs_to :user
  belongs_to :murmur, counter_cache: true
  validates :user_id, uniqueness: { scope: :murmur_id }
end
