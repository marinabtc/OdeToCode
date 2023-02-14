// js to save the reflexions input from the modal

// to do: add moment.js to html
var now = moment();

renderReflexions();

// to do: id to updated when reflexion modal has been added
$("#reflexion-button").on("click", save);

function save(){
    // id to updated when reflexion modal has been added 
    var reflexions = $("#reflexion-input").val();
    var reflexData = {
        date: now, 
        title: poemTitle, 
        author: poemAuthor, 
        reflexions: reflexions
    }

    reflexArr = JSON.parse(localStorage.getItem("reflexions"));
    reflexArr.push(reflexData);

    localStorage.setItem("reflexions", JSON.stringify(reflexArr));
}

function renderReflexions() {

    var reflexArr = JSON.parse(localStorage.getItem("reflexions"));

    for (var i = 0; i < reflexArr.length; i++) {
        console.log(reflexArr[i])
    }

}