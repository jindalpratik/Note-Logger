const noteForm = $("#note-form");
const noteInput = $("#note-input");
const noteList = $("#note-list");

let notes = {};
let id = 0;

if (localStorage.getItem("notes") !== null) {
  notes = JSON.parse(localStorage.getItem("notes"));
  id = Number(localStorage.getItem("id"));
}

// Add notes after browser refresh.
$.each(notes, function (curId) {
  addNoteToUl(curId);
});

let curEdit = [];

function addNoteToUl(curId) {
  const li = $("<li>").attr("id", "li-" + curId);
  const p = $("<p>")
    .attr("id", "p-" + curId)
    .attr("hidden", false)
    .text(notes[curId]);
  const textarea = $("<textarea>")
    .addClass("no-tabs")
    .attr("id", "textarea-" + curId)
    .attr("hidden", true);
  li.append(p);
  li.append(textarea);

  // Creating the Buttons and their classes.
  const div = $("<div>").addClass("note-buttons");
  const editButton = $("<button>")
    .addClass("edit-button")
    .attr("id", "edit-" + curId);
  const deleteButton = $("<button>")
    .addClass("delete-button")
    .attr("id", "delete-" + curId);

  // Creating the Button icons and their classes.
  const editButtonIcon = $("<i>").addClass("fas fa-edit");
  const deleteButtonIcon = $("<i>").addClass("fas fa-trash-alt");

  // Adding the note to the html with the buttons included.
  editButton.append(editButtonIcon);
  deleteButton.append(deleteButtonIcon);
  div.append(editButton).append(deleteButton);
  li.append(div);
  noteList.append(li);

  // Clear input
  noteInput.val("");
}

function addNote() {
  // Get note text
  const text = noteInput.val().trim();
  if (text === "") {
    return;
  }

  //Increment ID
  id += 1;

  // Add note to dictionary
  notes[id] = text;

  addNoteToUl(id);

  //Store the notes in browser storage
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("id", id);
}

noteForm.on("submit", function (event) {
  event.preventDefault();
  addNote();
});

// Delete note.
$(document).on("click", ".delete-button", function () {
  const del_id = $(this).attr("id");
  const liId = "#li-" + del_id.substr(7);
  $(liId).remove();
  delete notes[del_id.substr(7)];

  localStorage.setItem("notes", JSON.stringify(notes));
});

$(document).on("click", ".edit-button", function () {
  const edit_id = $(this).attr("id");
  const id = edit_id.substr(5);
  const textareaId = "#textarea-" + id;
  const pId = "#p-" + edit_id.substr(5);

  if (curEdit.indexOf(Number(id)) == -1) {
    $(pId).hide();
    $(textareaId).val(notes[id]).show();
    curEdit.push(Number(id));
    console.log(curEdit);
  } else {
    notes[id] = $(textareaId).val().trim();
    $(pId).show().text(notes[id]);
    $(textareaId).val("").hide();
    const remIndex = curEdit.indexOf(Number(id));
    curEdit.splice(remIndex, 1);
  }

  localStorage.setItem("notes", JSON.stringify(notes));
});

// Allow tabs in the notes.
$(".no-tabs").on("keydown", function (e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set note-input value to: text before caret + tab + text after caret
    $(this).val(
      $(this).val().substring(0, start) + "\t" + $(this).val().substring(end)
    );

    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

$(document).ready(function () {
  const noteElements = $("#note-elements");
  const settingsElements = $("#settings-elements");
  const settingsButton = $("#settings-button");
  const homeButton = $("#home-button");

  // Show note elements and hide settings
  function showNoteElements() {
    noteElements.show();
    settingsElements.hide();
    settingsButton.show();
    homeButton.hide();
  }

  // Show settings and hide note elements
  function showSettings() {
    noteElements.hide();
    settingsElements.show();
    settingsButton.hide();
    homeButton.show();
  }

  // Handle home button click
  homeButton.on("click", function () {
    showNoteElements();
  });

  // Handle settings button click
  settingsButton.on("click", function () {
    showSettings();
  });

  // Show note elements by default
  showNoteElements();
});
