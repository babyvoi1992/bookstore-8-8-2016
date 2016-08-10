
json.array!(@books) do |book|
  json.title book.title
  json.author book.author
  json.content book.content
  json.owner   book.user.email
  json.id      book.id

  json.partial! 'api/v1/books/book', locals: {book:book}

end


#json.array! @books, partial: 'books/book', as: :book

