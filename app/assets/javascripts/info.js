const SIGN_OUT_URL = "/api/v1/sign_out";
const BOOK_URL = "/api/v1/books/";
var method = "";
var url = "";
var pageSize = 5;
$(document).ready(function () {


  // Get all books when loading index page
  getBooks();


  //
  // HANDLE BUTTON CLICK EVENT
  //


  // Logout
  $("#btnlogout").click(function () {
    var processCallback = function (data) {
      deleteCookie("access-token");
      deleteCookie("client");
      deleteCookie("uid");
      window.location.href = "/demo"
    };

    ajaxRequest(SIGN_OUT_URL, "DELETE", processCallback, null);
  });


  // Show New book form
  $("#btnAdd").click(function () {
    method = "POST";
    url = "/api/v1/books";

    $("div>h4").html("Create Book");
    $("form>button").html("Create");
    $("#myModal").modal();
    $("#edtTitle").val("");
    $("#edtContent").val("");
    $("#edtAuthor").val("");


  });


  // Submit button (Create new and update existing book)
  $("#frmsubmit").submit(function (e) {
    e.preventDefault();
    data = {
      "book": {
        "title": $("#edtTitle").val(),
        "content": $("#edtContent").val(),
        "author": $("#edtAuthor").val()
      }
    };
    processCallback = function (data) {
      window.location.href = "/demo/info";
    };
    ajaxRequest(url, method, processCallback, data);
  });
});


// Get all books
function getBooks() {

  var processCallback = function (data) {
    var total = data.html.length;

    $("#txtfield").html(data.email);
    paginateBooks(data, pageSize, 1);

    $(".pagnation").bootpag({
      total: Math.ceil(total / pageSize),
      page: 1,
      maxVisible: 5,
      firstLastUse: true
    }).on("page", function (event, num) {
      $("#bodyContent.container").empty();
      paginateBooks(data, pageSize, num);
    }, null)
  };

  ajaxRequest(BOOK_URL, 'GET', processCallback, null);
}

// Show Edit book form
function editBook(e) {
  var id = $(e).attr("data-book-id");

  url = BOOK_URL + id;
  method = "PUT";

  $("div>h4").html("Edit Book");
  $("form>button").html("Edit");

  ajaxRequest(url, 'GET', function (data) {
    $("#myModal").modal();
    $("#edtTitle").val(data.title);
    $("#edtContent").val(data.content);
    $("#edtAuthor").val(data.author);
  }, null);


}


// Delete a book
function deleteBook(e) {
  var id = $(e).attr("data-book-id"),
      htmlRemove = $(e).closest("div.row"),
      processCallback = function (data) {
        htmlRemove.remove();
      };

  var url = BOOK_URL + id;

  ajaxRequest(url, 'DELETE', processCallback, null);
}

// Pagination
function paginateBooks(data, pagesize, pageindex) {
  html = "";
  htmlrow = data.html.slice((pageindex - 1) * pagesize, pagesize * pageindex)
  for (i = 0; i < htmlrow.length; i++) {
    html += htmlrow[i].html
  }
  var decoded = $("<textarea/>").html(html).text();
  $("#bodyContent.container").append(decoded)
}


// Ajax request function
function ajaxRequest(_url, _method, _callback, _data) {
  $.ajax({
    url: _url,
    method: _method,
    headers: {
      "access-token": getCookie("access-token"),
      "client": getCookie("client"),
      "uid": getCookie("uid")
    },
    datatype: 'json',
    async: false,
    data: _data,

    success: function (data) {
      if (typeof _callback === "function") {
        _callback(data);
      }
    }
  })
}


// Manage Cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

function Container(param) {
  this.member = param;
}