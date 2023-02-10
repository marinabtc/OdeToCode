var author = "Shakespeare";
var title;
var lines;

var linecount;

var queryURL = `https://poetrydb.org/author,poemcount/${author};1.json`;


// When the search button is clicked
$("#search-button").on("click", function() {

    // Grabs the value of the search by option
    var selected = $(".form-select").val();
    console.log(selected);

    // If search by "author" is selected
    if (selected == 1) {

        author = $("#main-input").val();

        //replaces spaces by % to be supported in the URL
        author.replace(" ", "%");

        console.log(author)

        queryURL = `https://poetrydb.org/author,random/${author};1,author,title,lines`;

    }

    // If search by "title" is selected
    else if (selected == 2) {

        title = $("#main-input").val();
        title.replace(" ", "%");
        console.log(title)

        queryURL = `https://poetrydb.org/title/${title},author,title,lines`;
    }

    // If search by "lines" is selected
    else if (selected == 3) {
        lines = $("#main-input").val();
        lines.replace(" ", "%");
        console.log(lines)

        queryURL = `https://poetrydb.org/lines,random/${lines};1,author,title,lines`;
    }

    // Call to the API using one of the queryURL value above   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

    })

})
