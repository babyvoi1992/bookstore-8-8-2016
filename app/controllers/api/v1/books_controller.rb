class Api::V1::BooksController < Api::ApiController
  respond_to :json

  before_action :authenticate_user!
  before_action :set_book, only: [:show, :update, :destroy]

  def index
    @username = current_user
    @books = (current_user.admin?) ? Book.all.includes(:user) : current_user.books
  end

  def show
    @book
  end

  def create
    @book = current_user.books.new(book_params)
    @book.save
  end

  # PATCH/PUT /books/1
  def update
    @book.update(book_params)

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
    params.require(:book).permit(:title, :content, :author)
  end
end


