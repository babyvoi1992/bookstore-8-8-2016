json.books do
  json.array!(@books) do |book|
    json.title    book.title
    json.author   book.author
    json.content  book.content
    json.id       book.id
  end
end
json.html do
  json.array! (@books) do |book|
    json.html render :partial => 'api/v1/books/book', locals: {book: book}, :formats => [:html], :handlers => [:erb]
  end
end
json.email @username.email

