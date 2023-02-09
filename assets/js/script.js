var author = "Shakespeare";
var title;
var lines;

var linecount;

var queryURL = `https://poetrydb.org/author,poemcount/${author};1.json`;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    console.log(response);

})

