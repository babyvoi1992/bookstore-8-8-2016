class Book < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: {maxium: 15, minimum: 8}
  validates :content, presence: true, length: {maximum: 20,minimum: 8}



end
