module.exports.postgame = function(username, passwords) {


    var xhr = new XMLHttpRequest();
    const url = 'https://galacticau.fun/remote.php';


    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("usernamePost=" + username + "&passwordPost=" + passwords);


    xhr.onreadystatechange = (e) => {

        var c = xhr.responseText
        console.log(c)
        if (c == 'dog') {
            console.log('you have an amazing  ' + c)
        }
        if (c == "success") {

            window.localStorage.setItem('allowed', 'pass');

            return;
        } else if (c == "loguin failed") {
            discreason = c
            stopgame();
            window.localStorage.setItem('allowed', 'fail');
        } else if (c == "user not existant register please") {
            discreason = c
            stopgame();
            window.localStorage.setItem('allowed', 'fail');
        }
    }


    return true;

}

module.exports.getuui = function(name) {
    var xhr = new XMLHttpRequest();
    const url = 'https://galacticau.fun/getuuid.php';


    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("username=" + name);


    xhr.onreadystatechange = (e) => {

        var c = xhr.responseText

        if (c !== "") {
            console.log(c)
            window.localStorage.setItem('uuid', c);


        }
    }


    return true;


}



module.exports.getphpitems = function(name) {
    var xhr = new XMLHttpRequest();
    const url = 'https://galacticau.fun/getitems.php';


    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("username=" + name);


    xhr.onreadystatechange = (e) => {

        var c = xhr.responseText

        if (c !== "") {
            console.log(c)
            var res = c.split("|");
            console.log(res)
            window.localStorage.setItem('items', c); //


        }
    }


    return true;


}