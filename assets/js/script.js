var author;
var title;
var lines;

var linecount;

// When the search button is clicked gets the poem corresponding to the input search
$("#search-button").on("click", getPoem);

// When the enter key is pressed is clicked gets the poem corresponding to the input search
$(".searchbar-whole").on("keyup", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    getPoem();

  }
});

// When "Advanced search" is clicked remove anything in the main search box
$(".adv-search").on("click", function () {

  $("#main-input").val("");
})

function getPoem() {
  // Grabs the value of the search by option
  var selected = $(".form-select").val();

  // Grabs the value of the main user input
  var mainInput = $("#main-input").val().trim();

  // Grabs the values of the advance search
  var advAuthor = $("#adv-author").val().trim();
  var advTitle = $("#adv-title").val().trim();
  var advLines = $("#adv-lines").val().trim();

  console.log("INPUT is: " + mainInput);
  console.log("Advance search is: " + advAuthor, advTitle, advLines);


  // Only executes if the input is not empty
  if (mainInput !== "") {
    // If search by "author" is selected
    if (selected == 1) {
      author = mainInput;

      //replaces spaces by % to be supported in the URL
      author.replace(" ", "%");

      queryURL = `https://poetrydb.org/author,random/${author};1`;
    }

    // If search by "title" is selected
    else if (selected == 2) {
      title = mainInput;
      title.replace(" ", "%");
      console.log(title);

      queryURL = `https://poetrydb.org/title,random/${title};1`;
    }

    // If search by "lines" is selected
    else if (selected == 3) {
      lines = mainInput;
      lines.replace(" ", "%");
      console.log(lines);

      queryURL = `https://poetrydb.org/lines,random/${lines};1`;
    }

    // If nothing is selected
    else {
      $("#no-search-by").modal("show");
    }

    // Call to the API using one of the queryURL value above
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {

      if (typeof response === Array) {
        console.log(response);

        // gets the poem's title
        var poemTitle = response[0].title;
        console.log("Title: " + poemTitle);

        // gets the poem's author
        var poemAuthor = response[0].author;
        console.log("Author: " + poemAuthor);

        // gets the poem's lines
        var poemLines = response[0].lines;

        console.log("Lines: ");

        // loops through the lines array
        for (var i = 0; i < poemLines.length; i++) {
          console.log(poemLines[i]);
// >>>>>>> main
        }
      }

      else {
        console.log("No poem found corresponding to your search term(s)")      
      }

    });
  }
  // Advance search
  else {

    // search by author + title
    if (advAuthor !== "" && advTitle !== "" && advLines === "") {

      advAuthor.replace(" ", "%");
      advTitle.replace(" ", "%");
      queryURL = `https://poetrydb.org/author,title,poemcount/${advAuthor};${advTitle};1`;
    
    }

    // search by author + lines
    else if (advAuthor !== "" && advTitle === "" && advLines !== "") {

      advAuthor.replace(" ", "%");
      advLines.replace(" ", "%");
      queryURL = `https://poetrydb.org/author,lines,poemcount/${advAuthor};${advLines};1`;

    }

    // search by title + lines
    else if (advAuthor === "" && advTitle !== "" && advLines !== "") {

      advTitle.replace(" ", "%");
      advLines.replace(" ", "%");
      queryURL = `https://poetrydb.org/title,lines,poemcount/${advTitle};${advLines};1`;
    
    }
  

    // Call to the API using one of the queryURL value above
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      if (typeof response === Array) {
        console.log(response);

        // gets the poem's title
        var poemTitle = response[0].title;
        console.log("Title: " + poemTitle);

        // gets the poem's author
        var poemAuthor = response[0].author;
        console.log("Author: " + poemAuthor);

        // gets the poem's lines
        var poemLines = response[0].lines;

        console.log("Lines: ");

        // loops through the lines array
        for (var i = 0; i < poemLines.length; i++) {
          console.log(poemLines[i]);
        }
      }

      else {
        console.log("No poem found corresponding to your search term(s)");
      }
    });
  }

  // resets the search boxes
  $("#main-input").val("");
  $("#adv-author").val("");
  $("#adv-title").val("");
  $("#adv-lines").val("");

}

// PoetryDB API path to get random poem: https://poetrydb.org/random
var getRandomPoemQuery = `https://poetrydb.org/random`;

$("#randomPoem").on("click", function () {
  $.ajax({
    url: getRandomPoemQuery,
    method: "GET",
  }).then(function (response) {
    // console.log("random poem", response);
    // log poem fields to console when "find me a poem" link is clicked from navbar
    console.log(
      `title: ${response[0].title}
      \nauthor: ${response[0].author}
      \npoem: ${response[0].lines}`
    );
  });
});