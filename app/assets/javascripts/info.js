$(document).ready(function () {
    method = ""
    url = ""
    var dataSource
    $.ajax({
        url: "http://localhost:3000/api/v1/books",
        method: "GET",
        headers: {
            "access-token": getCookie("access-token"),
            "client": getCookie("client"),
            "uid": getCookie("uid")
        },
        async: false,
        success: function (data) {
            dataSource = data
            encoded = ""
            for (i=0;i<data.length;i++)
            {
                encoded = encoded + data[i].html
            }
            $("#txtfield").html(data[0].owner)
            $("body").append(decoded)
            var decoded = $("<textarea/>").html(encoded).text();
            $("#bodyContent.container").append(decoded)
        }
    })

    $("#btnlogout").click(function () {
        $.ajax({
            url: "/api/v1/sign_out",
            method: "DELETE",
            datatype: 'json',
            headers: {
                "access-token": getCookie("access-token"),
                "client": getCookie("client"),
                "uid": getCookie("uid")
            },
            async: false,
            success: function () {
                delete_cookie("access-token");
                delete_cookie("client");
                delete_cookie("uid");
                window.location.href = "/demo"
            }
        });
    });

    var delete_cookie = function (name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    };
    console.log(dataSource)


    $("#btnAdd").click(function () {
        $("div>h4").html("Create Book")
        $("form>button").html("Create")
        $("#myModal").modal();
        $("#edtTitle").val("");
        $("#edtContent").val("");
        $("#edtAuthor").val("");
        method = "POST";
        url = "/api/v1/books"
    })

    $("#frmsubmit").submit(function (e) {
        e.preventDefault();
        data = {
            "book":{
                "title" : $("#edtTitle").val(),
                "content": $("#edtContent").val(),
                "author": $("#edtAuthor").val()
            }
        }
        $.ajax({
            url: url,
            method: method,
            headers: {
                "access-token": getCookie("access-token"),
                "client": getCookie("client"),
                "uid": getCookie("uid")
            },
            datatype: 'json',
            async:false,
            data:data,

            success: function () {
                window.location.href = "/demo/info"

            }
        })
    })
})

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
function deleteBook(e){
    id = $(e).attr("data-book-id")
    htmlRemove = $(e).closest("div.row")

    $.ajax({
        url: "/api/v1/books/"+id,
        method: "DELETE",
        headers: {
            "access-token": getCookie("access-token"),
            "client": getCookie("client"),
            "uid": getCookie("uid")
        },
        async:false,
        success: function () {
            htmlRemove.remove()

        }

    })

}

function editBook(e) {
    id = $(e).attr("data-book-id")
    $("div>h4").html("Edit Book")
    $("form>button").html("Edit")
    $.ajax({
        url: "/api/v1/books/"+id,
        method: "GET",
        headers: {
            "access-token": getCookie("access-token"),
            "client": getCookie("client"),
            "uid": getCookie("uid")
        },
        async:false,
        success: function (data) {
            method = "PUT"
            $("#myModal").modal();
            url = "/api/v1/books/"+id
            $("#edtTitle").val(data.title);
            $("#edtContent").val(data.content);
            $("#edtAuthor").val(data.author);
        }

    })

}