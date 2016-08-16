LINK_CONST = 'http://localhost:3000/'
LINK_DEFAULT_CONST = 'http://localhost:3000/books/default.jpeg'
class Api::V1::BooksController < Api::ApiController
  respond_to :json

  before_action :authenticate_user!
  before_action :set_book, only: [:show, :update, :destroy]

  #get all books
  def index
    @username = current_user
    @books = (current_user.admin?) ? Book.all.includes(:user) : current_user.books
  end

  #show boook by index
  def show
    @book
  end

  #create new book
  def create
    @book = current_user.books.new(book_params)
    id = Book.last.id+1
    if @book.imageurl != ''
      data = @book.imageurl
      path = write_file(data, id)
      @book.imageurl = LINK_CONST+path
    else
      @book.imageurl= LINK_DEFAULT_CONST
    end
    if @book.save
      @book
    else
      render 'api/v1/books/error', locals: {book: @book}
    end
  end

  # PATCH/PUT /books/1
  def update
    params = book_params
    id= @book.id
    if params[:imageurl] != ''
      data = params[:imageurl]
      path = write_file(data, id)
      params[:imageurl] = LINK_CONST+path
    else
      params[:imageurl] = LINK_DEFAULT_CONST
    end
    if @book.update(params)
      @book
    else
      render 'api/v1/books/error', locals: {book: @book}
    end
  end

  # DELETE /books/1
  def destroy
    @book.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_book
    @book = Book.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def book_params
    params.require(:book).permit(:title, :content, :author, :imageurl)
  end

  #Write file to public folder
  def write_file(data, id)
    header = data[/(data:.+)+base64,/]
    image_file = Base64.decode64(data[header.length..-1])
    path = "books/#{id}.#{data[/jpeg|png|jpg|gif/]}"
    new_file=File.new(Rails.public_path.join(path), 'wb')
    new_file.write(image_file)
    path
  end
end


