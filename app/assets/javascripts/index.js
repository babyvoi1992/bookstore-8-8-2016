$(document).on('click', "#submit", function () {


    var data = {
        email: $("#post_email").val(),
        password: $("#post_password").val()
    }

    $.ajax({
        url: "/api/v1/sign_in",
        datatype: 'json',
        method: 'POST',
        data: data,
        async: false,
        success: function (data, textstatus, response) {
            setCookie("access-token", response.getResponseHeader("access-token"), 1);
            setCookie("client", response.getResponseHeader("client"), 1);
            setCookie("uid", response.getResponseHeader("uid"), 1);
            window.location.href = "/demo/info";
        },
        error: function () {
            window.location.href = "/demo"
        }
    })
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;

}

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