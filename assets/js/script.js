var author;
var title;
var lines;

var linecount;

var searchHistory

// When the search button is clicked gets the poem corresponding to the input search
$("#search-button").on("click", getPoem);

// When the enter key is pressed is clicked gets the poem corresponding to the input search
$("#main-input").on("keyup", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    getPoem();
  }
});

function getPoem() {
  // Grabs the value of the search by option
  var selected = $(".form-select").val();

  // Grabs the value of the user input
  var input = $("#main-input").val().trim();

  console.log("INPUT is: " + input);

  // Only executes if the input is not empty
  if (input !== "") {
    // If search by "author" is selected
    if (selected == 1) {
      author = input;

      //replaces spaces by % to be supported in the URL
      author.replace(" ", "%");

      queryURL = `https://poetrydb.org/author,random/${author};1`;
    }

    // If search by "title" is selected
    else if (selected == 2) {
      title = input;
      title.replace(" ", "%");
      console.log(title);

      queryURL = `https://poetrydb.org/title,random/${title};1`;
    }

    // If search by "lines" is selected
    else if (selected == 3) {
      lines = input;
      lines.replace(" ", "%");
      console.log(lines);

      queryURL = `https://poetrydb.org/lines,random/${lines};1`;
    }

    // If nothing is selected
    else {
      alert("Please select a search parameter.");
    }

    // Call to the API using one of the queryURL value above
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      if (response !== null) {
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
    });
  }
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

// Modal popup save to local storage

document.getElementById("button").addEventListener("click", function() {
  // code to save to local storage
});
document.getElementById("button").addEventListener("click", function() {
  var note = document.getElementById("newnote").value;
  localStorage.setItem("note", note);
});
window.addEventListener("load", function() {
  var note = localStorage.getItem("note");
  if (note) {
    document.getElementById("newnote").value = note;
  }
});
