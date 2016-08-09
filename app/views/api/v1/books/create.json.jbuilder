if @book.errors.messages.count>0
  json.status status: :unprocessable_entity
else
  json.title  @book.title
  json.author @book.author
  json.content@book.content
  json.owner  @book.user.email
  json.bookid     @book.id
end

