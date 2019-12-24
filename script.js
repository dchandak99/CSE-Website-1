var HttpGetClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

var HttpPostClient = function() {
    this.post = function(aUrl, params, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "POST", aUrl, true );
        anHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");            
        anHttpRequest.send( params );
    }
}

function update() {
    var client = new HttpGetClient();
    client.get('https://ipapi.co/json/', function(response) {
        var postclient = new HttpPostClient();
        postclient.post('visit.php', "data="+response, function(response) {
        });
    });
}

function submitForm() {
    var postclient = new HttpPostClient();
    postclient.post('message.php', "name=" + document.getElementById('name').value + "&email=" + document.getElementById('email').value + "&message=" + document.getElementById('message').value, function(response) {
        alert(response);
        if (response.includes('success')) {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        }
    });
}