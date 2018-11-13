$(document).ready(function() {

    // Insert logout link
    if (!document.location.href.includes('login.html')) {
    	var username = pageState["username"];
    	var label = '[logout]';
    	var title = 'Log out ' + username;

        $('#versionForm label').before('<a id="logout" title="' + title + '" href="javascript:logout()">' + label + '</a>');
    }

    var version = $("#version");
    if (version.length != 0) {

        // Populate version selector
        $.get(
            "/versions.php",
            function(data) {
                var cur = document.location.href.replace(/.*\/api\/([^/]+).*/, "$1");
                $.each(data, function(i, v) {
                    var v = data[i];
                    var opt = version.append("<option value='" + v + "'>" + v + "</option>");
                    if (v == cur)
                        version.children().last().attr("selected", "selected");
                });
            },
            "json"
        );

        version.change(function(data) {
            document.location.href =
                document.location.href.replace(/\/api\/([^/]+)\//, "/api/" + this.value + "/");
        });

    } else if (top == window) {

        // Reload in a frame
        var href = document.location.href.replace(/\/([^\/]+)$/, "/#$1");
        document.location.replace(href);
    }
});

function logout()
{
    var url = document.location.href;
    document.location.href = url.replace(/\/[^/]*$/, '/login.html');
}
