var author;
var title;
var lines;

var linecount;

$(window).load(function () {
  getRandomPoemOnWindowLoad();
  getRandomPoets();
});

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
});

function getPoem() {
  // Grabs the value of the search by option
  var selected = $(".form-select").val();

  // Grabs the value of the main user input
  var mainInput = $("#main-input").val().trim();

  // Grabs the values of the advance search
  var advAuthor = $("#adv-author").val().trim();
  var advTitle = $("#adv-txtle").val().trim();
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
      if (response[0] !== undefined) {
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
        // for (var i = 0; i < poemLines.length; i++) {
        //   console.log(poemLines[i]);
        // }

        renderPoem(response);
      } else {
        $("#no-results").modal("show");
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
    } else {
      $("#params").modal("show");
      return;
    }

    // Call to the API using one of the queryURL value above
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      if (response[0] !== undefined) {
        console.log(response);

        renderPoem(response);
      } else {
        $("#no-results").modal("show");
      }
    });
  }

  // resets the search boxes
  $("#main-input").val("");
  $("#adv-author").val("");
  $("#adv-txtle").val(""); // shahid editting id to work on browser
  $("#adv-lines").val("");
}

// PoetryDB API path to get random poem: https://poetrydb.org/random
var getRandomPoemQuery = `https://poetrydb.org/random`;

// display random poem when page loads
function getRandomPoemOnWindowLoad() {
  $.ajax({
    url: getRandomPoemQuery,
    method: "GET",
  }).then(function (response) {
    renderPoem(response);
  });
}

function getRandomPoemOnClick() {
  $("#randomPoem").on("click", function () {
    $.ajax({
      url: getRandomPoemQuery,
      method: "GET",
    }).then(function (response) {
      renderPoem(response);
    });
  });
}

getRandomPoemOnClick();

// displays poem in the poem card
function renderPoem(response) {
  $(".Poem-Text").remove();

  // gets the poem's title
  var poemTitle = response[0].title;
  // adds title to the poem card
  $(".POTD-Title").text(poemTitle);

  // gets the poem's author
  var poemAuthor = response[0].author;
  // adds author to the poem card
  $(".POTD-Author").text(poemAuthor);

  // gets the poem's lines
  var poemLines = response[0].lines;

  // loops through the lines array and add each lines to the poem card
  for (var i = 0; i < poemLines.length; i++) {
    // $(".Poem-Text").text(poemLines[0])

    $(".POTD-Author").after(
      `<p class="Poem-Text d-flex justify-content-center">${poemLines[i]}</p>`
    );
  }
}

var getRandomPoetListQuery = `https://poetrydb.org/random/3/author`;

function getRandomPoets() {
  $.ajax({
    url: getRandomPoetListQuery,
    method: "GET",
  }).then(function (response) {
    // to save our non-repeat author list
    let uniqueAuthorList = [];

    // check each of the poets' names in response
    response.forEach((poetName) => {
      // if the poetName is not yet included in the uniqueAuthorList, we then add it
      if (!uniqueAuthorList.includes(poetName)) {
        uniqueAuthorList.push(poetName);
      }
    });

    // we then use the uniqueAuthorList to feed our random poet buttons
    var poet1 = $(".Poet-Sug-Btn-1").text(uniqueAuthorList[0].author);
    var poet2 = $(".Poet-Sug-Btn-2").text(uniqueAuthorList[1].author);
    var poet3 = $(".Poet-Sug-Btn-3").text(uniqueAuthorList[2].author);

    for (let i = 0; i < 4; i++) {
      $(`.Poet-Sug-Btn-${i}`).on("click", function () {
        var authorPoemQuery = `https://poetrydb.org/author,random/${$(
          `.Poet-Sug-Btn-${i}`
        ).text()};1`;

        $.ajax({
          url: authorPoemQuery,
          method: "GET",
        }).then(function (response) {
          renderPoem(response);
        });
      });
    }
  });
}

// Sucaad
// modal local storage
// document
//   .querySelector(".modal-footer button")
//   .addEventListener("click", function () {
//     var note = document.getElementById("newnote").value;
//     localStorage.setItem("reflexions", note);
//   });

// document
//   .getElementById("exampleModal")
//   .addEventListener("show.bs.modal", function () {
//     var note = localStorage.getItem("reflexions");
//     if (note) {
//       document.getElementById("newnote").value = note;
//     }
//   });


// MT
// Displays the reflections on the journal page
renderReflections();

// When reflection button clicked the input is save to local storage
$("#reflection-button").on("click", save);

var now = moment();
var reflectArr = [];

function save(){
  // id to updated when reflection modal has been added 
  var reflections = $("#reflection-input").val();
  console.log(reflections)
  var reflectData = {
    date: now.format("MMMM DD, YYYY - HH:mm"), 
    title: $(".POTD-Title").text(), 
    author: $(".POTD-Author").text(), 
    reflections: reflections
  }

  console.log(reflectData);
  console.log(JSON.parse(localStorage.getItem("reflections")));

  // when the local storage is not empty
  if (JSON.parse(localStorage.getItem("reflections")) != null ) {

    reflectArr = JSON.parse(localStorage.getItem("reflections"));
    reflectArr.push(reflectData);
        
    localStorage.setItem("reflections", JSON.stringify(reflectArr));

  }

  // when the local storage is empty
  else {

    reflectArr.push(reflectData);
    localStorage.setItem("reflections", JSON.stringify(reflectArr));
  }

}

// Displays the reflections on the journal page in a card format
function renderReflections() {

    var reflectArr = JSON.parse(localStorage.getItem("reflections"));

    if (reflectArr !== null) {

      for (var i = 0; i < reflectArr.length; i++) {
          console.log(reflectArr[i])

          var entry = reflectArr[i];
          console.log(entry);

          $(".journal-entries").append(
            `<div class="card mb-3" style="margin: 20px; src='../assets/Images/paper-bg.jpg">
              <p id="entry-date" style="padding:10px 10px 5px 10px;font-family:'Kallam';font-size:17px;margin:0px;"><b>${entry.date}</b></p>
              <h5 style="padding:5px 10px;font-family:'Kallam';font-size:17px;margin:0px">${entry.author} - <i>${entry.title}</i>
              </h5>
              <p style="padding: 5px 10px 10px ;font-family:'Kallam';font-size:17px;margin:0px">${entry.reflections}</p>
              </div>
            </div>`)

      }
    }
}


// Shahid adding code that displays the number of reflections in the card at bottom
function getJournalNumber() {
  if (localStorage.reflections) {
    $(".journalCount").after(`${JSON.parse(localStorage.reflections).length}`);
  }
  else {
    $(".journalCount").after(`0`);
  }
}
getJournalNumber();