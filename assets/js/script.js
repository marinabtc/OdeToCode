var author = "Shakespeare";
var title;
var lines;

var linecount;

var queryURL = `https://poetrydb.org/author,poemcount/${author};1.json`;

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});

// allows 100 requests per minute
var pixabayKey = `33504433-e2c6e09038652712b6d57ece1`;

// vc_todo: research encodeURIComponent
// vc_todo: figure out how to change the text within encodeURIComponent dynamically so we can relate it to user input
// if wanting different image_type, these are the possible options: "all", "photo", "illustration", "vector" - "all" is the default option
var queryPixabay = `https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(
  "shakespeare"
)}&image_type=photo`;

$.ajax({
  url: queryPixabay,
  method: "GET",
}).then(function (response) {
  // Pixabay API response; by default, API only returns a maximum of 500 images per query.
  //   console.log("pixabay", response);

  // create a img element to place the API returned image
  var poetImage = $("<img>");
  // console.log below shows response fields available in first item of hits array
  //   console.log("fields in first item of hits array", response.hits[0]);

  // previewURL is one of the ways we can use to display images; largeImageURL shows a larger image; we can also manipulate the query to set our own image size restrictions
  poetImage.attr("src", response.hits[0].previewURL);

  // prepend img element to div with poet id
  $("#poet").prepend(poetImage);
});
