const SIGN_OUT_URL = "/api/v1/sign_out";
const BOOK_URL = "/api/v1/books/";
var pageSize = 5,
    img = "";


$(document).ready(function () {

  var $bodyContent = $("#bodyContent.container");
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
      window.location.href = "/demo";
    };

    ajaxRequest(SIGN_OUT_URL, "DELETE", processCallback, null);
  });


  // Show New book form
  $("#btnAdd").click(function () {
    var $frmSubmit = $("#frmsubmit");

    $frmSubmit.data("method-type", "POST");
    $frmSubmit.data("url", BOOK_URL);
    $("div>h4").html("Create Book");
    $("form>button").html("Create");
    $("#myModal").modal();
    $("#edtTitle").val("");
    $("#edtContent").val("");
    $("#edtAuthor").val("");
    $("#imgthumbnail").hide();

  });


  // Delete a book
  $bodyContent.on('click', '.btn-danger[data-book-id]', function () {
    var id = $(this).attr("data-book-id"),
        htmlRemove = $(this).closest("div.row"),
        processCallback = function (data) {
          htmlRemove.remove();
        };

    var url = BOOK_URL + id;

    ajaxRequest(url, 'DELETE', processCallback, null);
  });


  // Show Edit book form
  $bodyContent.on('click', '.btn-primary[data-book-id]', function () {
        var id = $(this).attr("data-book-id");
        var frmSubmit = $("#frmsubmit");
        frmSubmit.data("method-type", "PUT");
        frmSubmit.data("url", BOOK_URL + id);

        $("div>h4").html("Edit Book");
        $("form>button").html("Edit");

        ajaxRequest(BOOK_URL + id, 'GET', function (data) {

          $("#myModal").modal();
          $("#edtTitle").val(data.title);
          $("#edtContent").val(data.content);
          $("#edtAuthor").val(data.author);
          $("#imgthumbnail").attr("src", data.url)
              .css("display", "block")
              .width(50)
              .height(50)
        }, null);
      }
  );

  // read file upload
  $("#inputFile").change(function () {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      FR.onload = function (e) {

        img = e.target.result;

        $("#imgthumbnail").attr('src', e.target.result)
            .css("display", "block")
            .width(50)
            .height(50)

      };
      FR.readAsDataURL(this.files[0]);
    }
  });

  // Submit button (Create new and update existing book)
  $("#frmsubmit").submit(function (e) {
    e.preventDefault();

    var method = $(this).data("method-type"),
        url = $(this).data("url"),

        data = {
          "book": {
            "title": $("#edtTitle").val(),
            "content": $("#edtContent").val(),
            "author": $("#edtAuthor").val(),
            "imageurl": img
          }
        };


    var processCallback = function (data) {
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
    }, null);
  };

  ajaxRequest(BOOK_URL, 'GET', processCallback, null);
}


// Pagination
function paginateBooks(data, pagesize, pageindex) {
  var html = "",
      htmlrow = data.html.slice((pageindex - 1) * pagesize, pagesize * pageindex);
  for (var i = 0; i < htmlrow.length; i++) {
    html += htmlrow[i].html
  }
  var decoded = $("<textarea/>").html(html).text();
  $("#bodyContent.container").append(decoded);
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
    },
    error: function (data) {
      if (_method == "DELETE" && typeof  _callback === "function") {
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