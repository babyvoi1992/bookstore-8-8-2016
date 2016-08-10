json.books do
  json.array!(@books) do |book|
    json.title book.title
    json.author book.author
    json.content book.content
    json.id      book.id
  end
end

json.html  render :partial =>  'api/v1/books/book', locals: {books:@books}, :formats => [:html],  :handlers=>[:erb]
json.email   @username.email

