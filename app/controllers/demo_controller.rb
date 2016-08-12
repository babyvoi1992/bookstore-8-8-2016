class DemoController < ApplicationController
  def index
  end


  def info

  end

  def export_excel
    @books = Book.all
    respond_to do |format|
      format.xlsx {
        response.headers['Content-Disposition'] = 'attachment; filename="all_products.xlsx"'
      }
    end
  end

  def test

  end
end
