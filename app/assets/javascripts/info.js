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
        }
    })



    if (dataSource.length > 50) {
        $("#bodyContent.container").append(
            "  <div class=\"row\">" +
            "    <div class=\"col-lg-12 col-sm-12\">" +
            "      <div class=\"well\">" +
            "        <p style=\"text-align: center\">admin@gmail.com<\/p>" +
            "      <\/div>" +
            "    <\/div>" +
            "  <\/div>"
        )
    } else if (dataSource.length > 0){
        $("#bodyContent.container").append(
            "  <div class=\"row\">" +
            "    <div class=\"col-lg-12 col-sm-12\">" +
            "      <div class=\"well\">" +
            "        <p style=\"text-align: center\">" + dataSource[0].owner + "<\/p>" +
            "      <\/div>" +
            "    <\/div>" +
            "  <\/div>"
        )
    }


    var i = 0
    while (i < dataSource.length) {
        var strVar = "";
        strVar += "<div class=\"row\">";
        strVar += "    <div class=\"col-lg-2 col-sm-2\">";
        strVar += "      <div class=\"well\">";
        strVar += "        <p><b>title<\/b><\/p>";
        strVar += "        <p>" + dataSource[i].title + "<\/p>";
        strVar += "      <\/div>";
        strVar += "    <\/div>";
        strVar += "    <div class=\"col-lg-2 col-sm-2\">";
        strVar += "      <div class=\"well\">";
        strVar += "        <p><b>author<\/b><\/p>";
        strVar += "        <p>" + dataSource[i].author + "<\/p><\/div>";
        strVar += "    <\/div>";
        strVar += "    <div class=\"col-lg-8 col-sm-8\">";
        strVar += "      <div class=\"well\" style='margin-bottom: 0px'>";
        strVar += "        <p><b>content<\/b><\/p>";
        strVar += "        <p>" + dataSource[i].content + "<\/p><\/div>";
        strVar += "        <button type=\"button\" class=\"btn-danger\"  data-book-id=\""+dataSource[i].id+"\" onclick='deleteBook(this)' style='margin-bottom: 5px;margin-top: 5px'>Delete<\/button>";
        strVar += "        <button type=\"button\" class=\"btn-primary\" data-book-id=\""+dataSource[i].id+"\" onclick='editBook(this)' style='margin-bottom: 5px;margin-top: 5px;margin-left:10px'>Edit<\/button>";
        strVar += "    <\/div>";
        strVar += "  <\/div>";

        $("#bodyContent.container").append(strVar)
        i++;
    }

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

   /* $(".btn-danger").click(function () {
        id = $(this).attr("data-book-id")
        htmlremove = $(this).closest("div.row")

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
                htmlremove.remove()

            }

        })
    })*/

    /*$(".btn-primary").click(function () {
        id = $(this).attr("data-book-id")
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
                $("#myModal").modal();
                $("#edtTitle").val(data.title);
                $("#edtContent").val(data.content);
                $("#edtAuthor").val(data.author);
            }

        })
    })
*/

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